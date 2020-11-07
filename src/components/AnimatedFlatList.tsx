import React, {useRef, useImperativeHandle} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {FlatList as GestureList} from 'react-native-gesture-handler';
import hoistNonReactStatics from 'hoist-non-react-statics';

export function Hoc<T>(Componet: any) {
  return class extends React.PureComponent<T> {
    render() {
      return <Componet {...this.props} />;
    }
  };
}

function AnimatedFlatList<P, S = {}>(Componen: React.ComponentClass<P, S>) {
  return React.forwardRef<React.Component<P, S>, P>((props, ref) => {
    let _ref = useRef(null);

    //@ts-ignore
    useImperativeHandle(ref, () => _ref.current?.getNode());

    class AnimatedF extends React.PureComponent<P, S> {
      render() {
        const props = this.props;
        return <Componen {...props} ref={ref} />;
      }
    }

    const AnimatedWraper = Animated.createAnimatedComponent(AnimatedF);

    return <AnimatedWraper {...props} />;
  });
}

const Flat = AnimatedFlatList<FlatListProps<ItemsProps>>(GestureList);

export default hoistNonReactStatics(Flat, FlatList);

Flat.defaultProps = {
  ...(Flat.defaultProps || {})
};
