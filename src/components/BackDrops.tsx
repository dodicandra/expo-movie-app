import React from 'react';
import {StyleSheet, View, FlatList, FlatListProps, Dimensions, Image, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemsProps} from '../../App';

const {width, height} = Dimensions.get('window');

const BACKDROP_H = height * 0.65;

const AnimatedFlatList: React.FC<FlatListProps<ItemsProps>> = Animated.createAnimatedComponent(FlatList);

interface Props {
  data: ItemsProps[];
}

const BackDrops: React.FC<Props> = ({data}) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <AnimatedFlatList
        data={data}
        keyExtractor={item => String(item.key + Math.random())}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height}}
        renderItem={({item, index}) => {
          return (
            <View style={styles.wraper}>
              <Image resizeMode="cover" style={[styles.img, {width: width}]} source={{uri: !item.backdrop ? null : item.backdrop}} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height
  },
  img: {
    height
  },
  wraper: {
    width,
    height,
    position: 'absolute'
  }
});

export default BackDrops;
