import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Booking, Detail} from '@screen';

const Screen = createStackNavigator<StackHome>();

export const HomeStack = () => {
  return (
    <Screen.Navigator screenOptions={{headerShown: false, animationTypeForReplace: 'push'}}>
      <Screen.Screen name="Home" component={Home} />
      <Screen.Screen name="Booking" component={Booking} />
      <Screen.Screen name="Detail" component={Detail} />
    </Screen.Navigator>
  );
};
