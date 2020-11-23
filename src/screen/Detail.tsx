import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Color} from 'types';

const {height, width} = Dimensions.get('screen');

type DetailStack = StackScreenProps<StackHome<any, any, ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({route}) => {
  const params = route.params;

  return (
    <View style={[StyleSheet.absoluteFill, styles.root]}>
      <SharedElement
        style={[styles.img, {borderBottomLeftRadius: 35, borderBottomRightRadius: 35, overflow: 'hidden'}]}
        id={`item.${params?.title}.card`}
      >
        <>
          <View style={{backgroundColor: 'rgba(0,0,0,0.5),', flex: 1, position: 'absolute', zIndex: 10, width, height}} />
          <Image source={{uri: params?.poster}} resizeMode="stretch" style={styles.img} />
        </>
      </SharedElement>
      <View style={styles.slider} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: Color.hitam0},
  img: {
    flex: 1.5,
    width: '100%',
    height: '100%'
  },
  slider: {
    flex: 1,
    backgroundColor: Color.hitam0
  }
});
