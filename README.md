# tagged-component

how to use:

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
