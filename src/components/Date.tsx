import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Color} from 'types';

interface Props {
  day: string | number;
  num: string | number;
  selected?: boolean;
  onPress?: () => void;
}

const DateSelection: FC<Props> = ({day, num, onPress, selected}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.dateContainer, {backgroundColor: selected ? Color.kuning : 'transparent'}]}>
        <Text style={[styles.dateDay, {color: selected ? 'black' : Color.white}]}>{num}</Text>
        <Text style={[styles.dateNum, {color: selected ? 'black' : Color.grey1}]}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(DateSelection);

const styles = StyleSheet.create({
  dateDay: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dateNum: {
    fontWeight: '800',
    fontSize: 12
  },
  dateContainer: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    borderRadius: 6
  }
});
