import React from 'react';

import {Image, StyleSheet, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Color} from 'types';

import {StackScreenProps} from '@react-navigation/stack';

type DetailStack = StackScreenProps<StackHome<any, any, ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({route}) => {
  const params = route.params;

  return (
    <View style={[styles.root]}>
      <SharedElement
        style={[{flex: 1, borderBottomLeftRadius: 35, borderBottomRightRadius: 35, overflow: 'hidden'}]}
        id={`item.${params?.title}.card`}
      >
        <Image source={{uri: params?.poster}} resizeMode="stretch" style={styles.img} />
      </SharedElement>
      <View style={styles.slider} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: Color.hitam0, padding: 2},
  img: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  slider: {
    flex: 1,
    backgroundColor: Color.hitam0
  }
});
