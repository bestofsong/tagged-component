# tagged-component

### How to use:

code using this thing:
```
import React from 'react';
import tc, { config } from 'tagged-component';
config(configObj); // example configOBj is posted below in configuring code

export default class AnyView extends React.Component {
  render() {
    return (
      <tc.anyOtherTag1.anyOtherTag2.TouchableOpacity>
        ...
      </tc.anyOtherTag1.anyOtherTag2.TouchableOpacity>
    );
  }
}

```


code configuring this thing:
```

const defaultHooks = {
  onPress(e, { tagConfig, tags, props, state }) {
    console.log('onPress: ', e.nativeEvent, tagConfig, tags, props, state);
  },
};

const longPress = {
  onLongPress(e, { tagConfig, tags, props, state }) {
    console.log('onLongPress: ', e.nativeEvent, tagConfig, tags, props, state);
  },
};

const pressIn = {
  onPressIn(e, { tagConfig, tags, props, state }) {
    console.log('onPressIn: ', e.nativeEvent, tagConfig, tags, props, state);
  },
};

export default {
  // optional: default {}
  hooks: defaultHooks,

  // optional, default will be: require('react-native')
  formalComponents: require('react-native'),

  tagConfig: {
    OrderList: {
      DelButton: {
        hooks: { ...defaultHooks, ...longPress, ...pressIn },
        info: {
          name: '取消订单',
        },
      },
    },

    good: {
      Better: {
        best: {
          whatEverObjectYouLike: { whatEver: 'what eveer button' },
        }
      }
    }
  },
};



```




### How does this thing works?  

A wrapper component around TouchableOpacity is generated on the fly and has access to the tags you supplied via:tc.anyOtherTag1.anyOtherTag2.TouchableOpacity  

The tags as an array together with component props and state and the config itself is passed back to your configured callbacks .  


A use case I found useful is to pass pageName and button name as tags which is used in callbacks to locate custom data in the configOBj(custom data is not necessarily put here) which is used in logging.
