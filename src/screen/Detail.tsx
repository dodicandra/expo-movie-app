import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const {height, width} = Dimensions.get('screen');

type DetailStack = StackScreenProps<StackHome<any, any, ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({route}) => {
  const params = route.params;
  return (
    <View style={[StyleSheet.absoluteFill, styles.root]}>
      <SharedElement style={[StyleSheet.absoluteFill]} id={`item.${params?.title}.card`}>
        <Image source={{uri: params?.backdrop}} resizeMode="stretch" style={{position: 'absolute', ...styles.img}} />
      </SharedElement>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  root: {flex: 1},
  img: {width, height}
});
