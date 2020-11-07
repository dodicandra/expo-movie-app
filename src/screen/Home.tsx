import {AnimatedFlatList, Arrow, BackDrops, Button, Card, SearchBar} from '@components';
import {useMovie} from '@hooks';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useCallback, useState} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Platform
} from 'react-native';
import Animated, {Extrapolate, useValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ITEM_W} from 'components/Card';

const {width, height} = Dimensions.get('screen');

const EMTY = (width - ITEM_W) / 2;

type List = {
  listX: Animated.Value<number>;
  data: ListRenderItemInfo<ItemsProps>;
  onPress?: (e: GestureResponderEvent) => void;
  booking?: (e: GestureResponderEvent) => void;
};

type HomeStack = StackScreenProps<StackHome<ItemsProps, ItemsProps>, 'Home'>;

class RenderItem extends React.PureComponent<List> {
  render() {
    const {
      listX,
      data: {index, item},
      onPress,
      booking
    } = this.props;

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
          <Button uniq={item.title} onPress={booking} color="white" style={{marginTop: 30}} text="buy ticket" backGround="#F00000" />
        </Animated.View>
        <TouchableOpacity onPress={onPress}>
          <Card style={{transform: [{translateY: itemTranslate}]}} src={{uri: item.poster}} title={item.title} />
        </TouchableOpacity>
      </View>
    );
  }
}

const Home: React.FC<HomeStack> = ({navigation}) => {
  const scrollX = useValue(0);
  const {setPages, movie, page, pages} = useMovie();
  const [nextPage, setNext] = useState(false);
  const ref = useRef<Animated.ScrollView & ScrollView>(null);
  const onScroll = Animated.event<NativeSyntheticEvent<NativeScrollEvent>>([{nativeEvent: {contentOffset: {x: scrollX}}}]);
  const next = Number(pages?.total) - Number(pages?.page);
  const actions = (items: ItemsProps) => {
    navigation.navigate('Detail', items);
  };

  const calback = useCallback(() => {
    setPages(page + 1);
    setNext(true);
  }, [page]);

  const prev = () => {
    setPages(old => Math.max(old - 1, 1));
    setNext(false);
  };

  useEffect(() => {
    if (ref.current && nextPage) {
      //@ts-ignore
      ref.current.getNode().scrollToIndex({animated: true, index: 0});
    }
  }, [next, calback]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <BackDrops x={scrollX} data={movie!} />
      <Arrow disable={page === 1} onPress={prev} rotate="180deg" style={{top: height * 0.4, left: width * 0.04, zIndex: 20}} />
      <Arrow disable={next === 0} onPress={() => calback()} rotate="0deg" style={{top: height * 0.4, right: width * 0.04, zIndex: 21}} />
      <AnimatedFlatList
        data={movie}
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.items}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingVertical: 60}}
        snapToInterval={ITEM_W}
        onScroll={onScroll}
        onEndReachedThreshold={0.2}
        snapToAlignment="start"
        maxToRenderPerBatch={10}
        decelerationRate="fast"
        onEndReached={e => calback()}
        updateCellsBatchingPeriod={20}
        initialNumToRender={10}
        renderItem={item => (
          <RenderItem
            booking={() => navigation.navigate('Booking', item.item)}
            onPress={() => actions(item.item)}
            data={item}
            listX={scrollX}
          />
        )}
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
