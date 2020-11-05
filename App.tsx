import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '@router';
import React, {useContext} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Modal} from 'react-native';
import Provider, {ContextAPI} from '@hooks';

function Main() {
  const {loading} = useContext(ContextAPI);
  return (
    <SafeAreaProvider>
      <StatusBar animated translucent showHideTransition="fade" hidden />
      <NavigationContainer>
        <HomeStack />
        <Modal statusBarTranslucent hardwareAccelerated animationType="slide" visible={loading} transparent={true}>
          <View style={{backgroundColor: 'rgba(200, 200, 200, 0.3)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="rgb(105, 41, 255)" />
          </View>
        </Modal>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  );
}
