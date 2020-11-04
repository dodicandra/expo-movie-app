import React from 'react';
import {StyleSheet, View, TouchableOpacity, ViewStyle, GestureResponderEvent} from 'react-native';
import Buton from '../../assets/svg/arrow.svg';

interface Props {
  rotate: string;
  style?: ViewStyle;
  onPress?: (e: GestureResponderEvent) => void;
}

const Arrow: React.FC<Props> = ({rotate = '0deg', style, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wraper, style]}>
      <Buton width={25} height={25} fill="white" style={{transform: [{rotate}]}} />
    </TouchableOpacity>
  );
};

export default Arrow;

const styles = StyleSheet.create({
  wraper: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});
