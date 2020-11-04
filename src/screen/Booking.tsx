import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type BookingStack = StackScreenProps<StackHome<ItemsProps>, 'Booking'>;

const Booking: React.FC<BookingStack> = ({route}) => {
  const params = route.params;
  return (
    <View>
      <Text>{JSON.stringify(params, null, 2)}</Text>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
