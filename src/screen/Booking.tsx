import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Dimensions, View, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const {height, width} = Dimensions.get('screen');

type BookingStack = StackScreenProps<StackHome<any, ItemsProps>, 'Booking'>;

const Booking: React.FC<BookingStack> = ({route}) => {
  const params = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <SharedElement id={`item.${params?.title}.title`}>
        <Image source={{uri: params?.poster}} resizeMode="cover" style={{width: width * 0.4, height: height * 0.5}} />
      </SharedElement>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
