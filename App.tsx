import {Home} from '@screen';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar animated translucent showHideTransition="fade" hidden />
      <Home />
    </SafeAreaProvider>
  );
}
