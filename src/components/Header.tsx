import React from 'react';
import {View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet} from 'react-native';

import Box from './Box';

import ArrowSlim from '../../assets/svg/arrow-slim.svg';
import {Color} from 'types';

type HeaderProps = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const Header: React.FC<HeaderProps> = ({title, onPress}) => (
  <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10}}>
    <Box style={{marginLeft: 10}} size={40}>
      <TouchableOpacity onPress={onPress}>
        <ArrowSlim style={{transform: [{rotate: '180deg'}]}} fill={Color.grey1} width={20} height={20} />
      </TouchableOpacity>
    </Box>
    <View
      style={{
        backgroundColor: 'yelow',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View style={{width: '70%', alignSelf: 'center'}}>
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          style={{textAlign: 'center', fontSize: 20, fontWeight: '800', color: Color.white, textTransform: 'uppercase', letterSpacing: 1.3}}
        >
          {title}
        </Text>
      </View>
    </View>
  </View>
);

export default Header;
