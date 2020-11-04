import {Home} from '@screen';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '@router';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar animated translucent showHideTransition="fade" hidden />
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
