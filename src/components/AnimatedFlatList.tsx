import hoistNonReactStatics from 'hoist-non-react-statics';
import React, {useRef} from 'react';
import {FlatList, FlatListProps, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import {render} from 'react-dom';

export function Hoc<T extends object>(Componet: React.ComponentType<T>) {
  return class HighOrder extends React.PureComponent<T> {
    render() {
      return <Componet {...this.props} />;
    }
  };
}

function AnimatedFlatList<P, S = {}>(Componen: React.ComponentClass<P, S>) {
  return React.forwardRef<any, P>((props, ref) => {
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

const AFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedRef: React.RefForwardingComponent<any, FlatListProps<ItemsProps>> = (props, ref) => {
  const _ref = useRef<Animated.ScrollView>(null);

  return <AFlatList ref={ref} {...props} />;
};

const forw = React.forwardRef(AnimatedRef);

const Flat = AnimatedFlatList<FlatListProps<ItemsProps>>(FlatList);

export default hoistNonReactStatics(forw, ScrollView);
