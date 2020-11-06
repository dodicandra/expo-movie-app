import {Booking, Detail, Home} from '@screen';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Screen = createSharedElementStackNavigator<StackHome>();

const iosTransitionSpec = {
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
      <Screen.Screen name="Booking" component={Booking} />
      <Screen.Screen
        name="Detail"
        component={Detail}
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: {animation: 'timing', config: {delay: 1000}},
            close: {animation: 'timing', config: {duration: 1000}}
          }
        }}
        sharedElementsConfig={route => {
          const {title} = route.params;
          return [{id: `title.${title}.card`, animation: 'fade-in'}];
        }}
      />
    </Screen.Navigator>
  );
};
