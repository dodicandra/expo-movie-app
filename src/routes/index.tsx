import {Booking, Detail, Home} from '@screen';
import React from 'react';
import Animated from 'react-native-reanimated';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Screen = createSharedElementStackNavigator<StackHome>();

export function springyFadeIn() {
  const transitionSpec = {
    timing: Animated.spring,
    tension: 10,
    useNativeDriver: true
  };

  return {
    transitionSpec,
    screenInterpolator: ({position, scene}: any) => {
      const {index} = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1]
      });

      return {opacity};
    }
  };
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10
  }
};

export const HomeStack = () => {
  return (
    <Screen.Navigator mode="card" screenOptions={{headerShown: false, animationTypeForReplace: 'push'}}>
      <Screen.Screen name="Home" component={Home} />
      <Screen.Screen
        name="Booking"
        component={Booking}
        sharedElementsConfig={route => {
          const {title} = route.params;

          return [{id: `button.red.${title}`, align: 'auto'}];
        }}
      />
      <Screen.Screen
        name="Detail"
        component={Detail}
        sharedElementsConfig={(route, o, n) => {
          const {title} = route.params;
          return [{id: `item.${title}.card`, align: 'center-center'}];
        }}
      />
    </Screen.Navigator>
  );
};
