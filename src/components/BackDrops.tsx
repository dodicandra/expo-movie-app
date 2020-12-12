import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {Dimensions, ImageBackground, Keyboard, ListRenderItemInfo, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {Color} from 'types';

import AnimatedFlatList from './AnimatedFlatList';
import Button from './Button';
import {ITEM_W} from './Card';
import DetailInfo from './InfoDetail';

const {width, height} = Dimensions.get('screen');

type List = {
  listX: Animated.Value<number>;
  data: ListRenderItemInfo<ItemsProps>;
};

interface Props {
  data: ItemsProps[];
  x: Animated.Value<number>;
}

const RenderItem: FC<List> = memo(({data: {index, item}, listX}) => {
  const translateX = listX.interpolate({
    inputRange: [(index - 2) * ITEM_W, (index - 1) * ITEM_W],
    outputRange: [0, width]
  });

  if (!item.backdrop) {
    return null;
  }

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, {width: translateX}]}>
      <ImageBackground resizeMode="cover" source={{uri: item.backdrop}} style={[styles.wraper]}>
        <View style={styles.infoWraper}>
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.title} adjustsFontSizeToFit>
              {item?.title}
            </Text>
            <View style={styles.rating}>
              <Button color="white" text="popular with friend" />
              <Button color="white" text={!item?.adult ? '+18' : '+15'} paddingHorizontal={5} />
              <Button text={`${item?.rating}`} per backGround={Color.kuning} />
            </View>
          </View>
          <DetailInfo genre={item?.genres} date={item?.releaseDate} />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.opacity} />
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Animated.View>
  );
});

const BackDrops: React.FC<Props> = React.memo(
  ({data, x}): JSX.Element => {
    const [movie, setMovie] = useState<ItemsProps[]>([]);

    const Rendermemo = useCallback<FC<List>>(({data, listX}) => <RenderItem data={data} listX={listX} />, []);

    useEffect(() => {
      setMovie(data);
    }, [data]);

    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <AnimatedFlatList
          data={movie.reverse()}
          keyExtractor={item => String(item.key + Math.random())}
          removeClippedSubviews={false}
          contentContainerStyle={{width, height}}
          pagingEnabled
          horizontal={true}
          renderItem={item => <Rendermemo data={item} listX={x} />}
        />
      </View>
    );
  },
  (prev, next) => {
    return JSON.stringify(prev.data) === JSON.stringify(next.data);
  }
);

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    height
  },
  container: {
    width,
    height
  },
  wraper: {
    position: 'absolute',
    height,
    width
  },
  infoWraper: {
    marginTop: height * 0.14,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.4,
    marginBottom: 20
  },
  info: {
    flexDirection: 'column',
    width: width * 0.9,
    paddingVertical: 20,
    justifyContent: 'center',
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

export default BackDrops;
