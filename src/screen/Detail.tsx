import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const {height, width} = Dimensions.get('screen');

type DetailStack = StackScreenProps<StackHome<any, any, ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({route}) => {
  const params = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SharedElement id={`item.${params?.title}.card`}>
        <Image source={{uri: params?.poster}} resizeMode="cover" style={{width: width, height: height * 0.5}} />
      </SharedElement>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
