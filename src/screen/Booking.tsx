import {Box} from '@components';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';

import {Color} from 'types';

import ArrowSlim from '../../assets/svg/arrow-slim.svg';

const {height, width} = Dimensions.get('screen');

type BookingStack = StackScreenProps<StackHome<any, ItemsProps>, 'Booking'>;

const Booking: React.FC<BookingStack> = ({route}) => {
  const params = route.params;
  return (
    <View style={{flex: 1, backgroundColor: Color.hitam0}}>
      <View style={{flex: 1}}>
        <Box size={40}>
          <TouchableOpacity>
            <ArrowSlim style={{transform: [{rotate: '180deg'}]}} fill={Color.grey1} width={20} height={20} />
          </TouchableOpacity>
        </Box>
      </View>
      <View style={styles.payWraper}>
        <View style={styles.price}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.payLabel}>
            $ {params?.price}
          </Text>
        </View>
        <SharedElement style={styles.pay} id={`button.red.${params?.title}`}>
          <View style={styles.pay}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.payLabel}>Pay</Text>
            </View>
          </View>
        </SharedElement>
      </View>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  payWraper: {flex: 0.1, flexDirection: 'row'},
  price: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 18,
    borderWidth: 1,
    borderColor: Color.grey1,
    margin: 2
  },
  pay: {
    backgroundColor: Color.merah,
    flex: 1,
    borderTopLeftRadius: 18,
    margin: 2
  },
  payLabel: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 1.2,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
