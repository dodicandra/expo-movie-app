import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import Animated from 'react-native-reanimated';

export function Hoc<T>(Componet: any) {
  return class extends React.PureComponent<T> {
    render() {
      return <Componet {...this.props} />;
    }
  };
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class AnimatedF<T = object> extends React.PureComponent<FlatListProps<T>> {
  render() {
    const props = this.props;
    return <AnimatedFlatList {...props} />;
  }
}

export default AnimatedF;
