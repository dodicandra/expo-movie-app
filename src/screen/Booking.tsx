import {Dates, Header} from '@components';
import {StackScreenProps} from '@react-navigation/stack';
import React, {memo, useState, Profiler} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

import {Color} from 'types';
import {getDaysInMonth} from 'utils';

const {width} = Dimensions.get('screen');

type BookingStack = StackScreenProps<StackHome<object, ItemsProps>, 'Booking'>;
const date = getDaysInMonth(new Date().getMonth(), new Date().getFullYear(), new Date().getDate());

const Booking: React.FC<BookingStack> = ({route, navigation}) => {
  const params = route.params;
  const [selected, setSelected] = useState(0);

  console.log('re-renders');
  return (
    <View style={{flex: 1, backgroundColor: Color.hitam0}}>
      <View style={{flex: 1}}>
        <Header onPress={() => navigation.goBack()} title={params?.title} />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View style={styles.date}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}} horizontal showsHorizontalScrollIndicator={false}>
              {date.map((dates, i) => (
                <Profiler
                  key={dates.num}
                  id={`profile-${i}`}
                  onRender={(...c) => {
                    console.log('object', c);
                  }}
                >
                  <Dates selected={selected === i} onPress={() => setSelected(i)} day={dates.day} num={dates.num} />
                </Profiler>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
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

export default memo(Booking);

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
  },
  date: {
    backgroundColor: 'black',
    paddingVertical: 30,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    marginTop: 35,
    width: width * 0.85,
    alignSelf: 'flex-end'
  }
});
