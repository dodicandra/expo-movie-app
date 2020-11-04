import {Arrow, BackDrops, Button, Card, SearchBar} from '@components';
import {StackScreenProps} from '@react-navigation/stack';
import {useFetchMore} from '@utils';
import React from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  GestureResponderEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View
} from 'react-native';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ITEM_W} from 'components/Card';
import {ItemsProps} from 'types';

const {width, height} = Dimensions.get('screen');

const AnimatedFlatList: React.FC<FlatListProps<ItemsProps>> = Animated.createAnimatedComponent(FlatList);

const EMTY = (width - ITEM_W) / 2;

type List = {
  listX: Animated.Value<number>;
  data: ListRenderItemInfo<ItemsProps>;
  onPress?: (e: GestureResponderEvent) => void;
};

type HomeStack = StackScreenProps<StackHome<ItemsProps>, 'Home'>;

const RenderItem: React.FC<List> = React.memo(({listX, data: {index, item}, onPress}) => {
  if (!item.poster) {
    return <View style={{width: EMTY}} />;
  }

  const inputRange = [(index - 2) * ITEM_W, (index - 1) * ITEM_W, index * ITEM_W];

  const translateY = listX.interpolate({
    inputRange,
    outputRange: [-100, 0, -100],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = listX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const itemTranslate = listX.interpolate({
    inputRange,
    outputRange: [100, 40, 100],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <View style={styles.item}>
      <Animated.View style={{alignItems: 'center', opacity, transform: [{translateY}]}}>
        <Button color="white" onPress={onPress} style={{marginTop: 30}} text="buy ticket" backGround="#F00000" />
      </Animated.View>
      <Card style={{transform: [{translateY: itemTranslate}]}} src={{uri: item.poster}} title={item.title} />
    </View>
  );
});

const Home: React.FC<HomeStack> = ({navigation}) => {
  const scrollX = new Animated.Value(0);
  const [movie, _, loading] = useFetchMore();

  const onScroll = Animated.event<NativeSyntheticEvent<NativeScrollEvent>>([{nativeEvent: {contentOffset: {x: scrollX}}}], {
    useNativeDriver: true
  });

  if (loading) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <BackDrops x={scrollX} data={movie} />
      <Arrow rotate="180deg" style={{top: height * 0.4, left: width * 0.04, zIndex: 20}} />
      <Arrow rotate="0deg" style={{top: height * 0.4, right: width * 0.04, zIndex: 21}} />
      <AnimatedFlatList
        data={movie}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.items}
        keyExtractor={item => String(item.key + Math.random() * 1000)}
        contentContainerStyle={{paddingVertical: 60}}
        snapToInterval={ITEM_W}
        onScroll={onScroll}
        onEndReachedThreshold={0.2}
        snapToAlignment="start"
        renderItem={item => <RenderItem onPress={() => navigation.navigate('Booking', item.item)} data={item} listX={scrollX} />}
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
    top: height * 0.28
  },
  item: {
    padding: 10,
    width: ITEM_W
  }
});

export default Home;
