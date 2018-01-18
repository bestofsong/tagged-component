import React, { Component } from 'react';

let formalComponents = null;

const tagConf = {};
export function config(conf) {
  Object.assign(tagConf, conf);
  if (tagConf.formalComponents) {
    // eslint-disable-next-line
    formalComponents = tagConf.formalComponents;
  } else {
    formalComponents = require('react-native');
  }
}

const viewCache = (() => {
  const VIEWS = {};
  return {
    get(name) {
      return VIEWS[name];
    },
    set(name, View) {
      VIEWS[name] = View;
    },
  };
})();

const SS_TAGS_KEY = 'SS_TAGS_KEY';

const proxyGet = (target, name) => {
  if (!formalComponents[name]) {
    const tags = target[SS_TAGS_KEY] || [];
    tags.push(name);
    return new Proxy({ [SS_TAGS_KEY]: tags }, { get: proxyGet });
  }

  const tags = target[SS_TAGS_KEY];
  let { hooks = {} } = tagConf;
  const { tagConfig } = tagConf;
  const { hooks: hooks2 } = tags.reduce((res, it) => res[it], tagConfig);
  if (hooks2) {
    hooks = hooks2;
  }

  const OriginalComponent = formalComponents[name];
  if (!Object.keys(hooks).length) {
    return OriginalComponent;
  }

  const viewCacheKey = `${tags.join('-')}-${name}`;

  if (!viewCache.get(viewCacheKey)) {
    const view = class extends Component {
      render() {
        // eslint-disable-next-line
        const props = { ...this.props };
        Object.keys(hooks).forEach((propKey) => {
          const hook = hooks[propKey];
          const propValue = this.props[propKey];

          props[propKey] = (...args) => {
            if (propValue) {
              propValue(...args);
            }

            hook(
              ...args,
              { tagConfig: tagConf.tagConfig, tags, props, state: this.state });
          };
        });

        return (
          <OriginalComponent
            {...props}
          />
        );
      }
    };

    viewCache.set(viewCacheKey, view);
  }

  return viewCache.get(viewCacheKey);
};

export default new Proxy({}, { get: proxyGet });
