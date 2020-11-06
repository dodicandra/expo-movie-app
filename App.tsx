import Provider, {useMovie} from '@hooks';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '@router';
import React from 'react';
import {ActivityIndicator, Modal, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Color} from 'typed';

function Main() {
  const {loading} = useMovie();
  return (
    <SafeAreaProvider>
      <StatusBar animated translucent showHideTransition="fade" hidden />
      <NavigationContainer>
        <HomeStack />
        <Modal statusBarTranslucent hardwareAccelerated animationType="slide" visible={loading} transparent={true}>
          <View style={{backgroundColor: Color.hitam1, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={Color.blue1} />
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
