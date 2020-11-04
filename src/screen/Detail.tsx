import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type DetailStack = StackScreenProps<StackHome<ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({route}) => {
  const params = route.params;
  return (
    <View>
      <Text>{}</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
