import {getMovies} from '@api';
import {BackDrops, Button, Card, SearchBar} from '@components';
import {ITEM_W} from 'components/Card';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Dimensions, NativeSyntheticEvent, NativeScrollEvent, FlatListProps, Alert} from 'react-native';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ItemsProps} from 'types';

const {width} = Dimensions.get('screen');

const AnimatedFlatList: React.FC<FlatListProps<ItemsProps>> = Animated.createAnimatedComponent(FlatList);

const EMTY = (width - ITEM_W) / 2;

const Home: React.FC = () => {
  const [movie, setMovie] = useState<ItemsProps[]>([]);
  const scrollX = new Animated.Value(0);

  const onScroll = Animated.event<NativeSyntheticEvent<NativeScrollEvent>>([{nativeEvent: {contentOffset: {x: scrollX}}}], {
    useNativeDriver: true
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getMovies();
      setMovie([{key: 'item-right', title: 'item-right'}, ...(data as any), {key: 'item-left', title: 'item-left'}]);
    };
    if (movie.length === 0) {
      getData();
    }
  }, [movie]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <BackDrops x={scrollX} data={movie} />
      <AnimatedFlatList
        data={movie}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.items}
        keyExtractor={item => item.title}
        contentContainerStyle={{paddingVertical: 60}}
        snapToInterval={ITEM_W}
        onScroll={onScroll}
        renderToHardwareTextureAndroid
        snapToAlignment="start"
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: EMTY}} />;
          }

          const inputRange = [(index - 2) * ITEM_W, (index - 1) * ITEM_W, index * ITEM_W];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [-100, 0, -100],
            extrapolate: Extrapolate.CLAMP
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP
          });

          const itemTranslate = scrollX.interpolate({
            inputRange,
            outputRange: [100, 40, 100],
            extrapolate: Extrapolate.CLAMP
          });

          return (
            <View style={styles.item}>
              <Animated.View style={{alignItems: 'center', opacity, transform: [{translateY}]}}>
                <Button color="white" onPress={() => Alert.alert('cl')} style={{marginTop: 30}} text="buy ticket" backGround="#F00000" />
              </Animated.View>
              <Card style={{transform: [{translateY: itemTranslate}]}} src={{uri: item.backdrop}} title={item.title} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  items: {
    ...StyleSheet.absoluteFillObject,
    top: 270
  },
  item: {
    padding: 10,
    width: ITEM_W
  }
});

export default Home;
