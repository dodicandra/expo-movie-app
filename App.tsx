import {BackDrops, Button, DetailInfo, SearchBar} from '@components';
import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {getMovies} from './src/api';

const {width, height} = Dimensions.get('window');

export interface ItemsProps {
  key: string;
  poster: string;
  title: string;
  genres: Array<any>;
  description: string;
  backdrop: any;
  rating: number;
  adult: boolean;
  releaseDate: string;
}

export default function App() {
  const [movie, setMovie] = useState<ItemsProps[]>([]);
  console.log('movie=>>', movie);
  useEffect(() => {
    const getData = async () => {
      const data = await getMovies();
      setMovie(data as any);
    };
    if (movie.length === 0) {
      getData();
    }
  }, [movie]);

  return (
    <SafeAreaProvider>
      <StatusBar animated translucent showHideTransition="fade" barStyle="light-content" backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        <BackDrops data={movie} />
        <SearchBar />
        <View style={styles.infoWraper}>
          <View style={styles.info}>
            <Text style={styles.title} adjustsFontSizeToFit>
              {movie[0]?.title}
            </Text>
            <View style={styles.wraper}>
              <Button color="white" text="popular with friend" />
              <Button color="white" text={movie[1]?.adult ? '+18' : '+10'} paddingHorizontal={5} />
              <Button text={`${movie[1]?.rating}`} per backGround="#F7BB0E" />
            </View>
          </View>
          <DetailInfo genre={movie[1]?.genres} date={movie[1]?.releaseDate} />
          <Button color="white" style={{marginTop: 30}} text="buy ticket" backGround="#F00000" />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.opacity} />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  info: {
    flexDirection: 'column',
    width: width * 0.9,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.4,
    marginBottom: 20
  },
  infoWraper: {
    marginTop: height * 0.15,
    zIndex: 10,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center'
  },
  opacity: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  }
});
