import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Box} from '@components';

import ArrowSlim from '../../assets/svg/arrow-slim.svg';
import {Color} from 'types';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({title}) => (
  <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10}}>
    <Box style={{marginLeft: 10}} size={40}>
      <TouchableOpacity>
        <ArrowSlim style={{transform: [{rotate: '180deg'}]}} fill={Color.grey1} width={20} height={20} />
      </TouchableOpacity>
    </Box>
    <View style={{flex: 1}}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{textAlign: 'center', fontSize: 20, fontWeight: '800', color: Color.white, textTransform: 'uppercase'}}
      >
        {title}
      </Text>
    </View>
  </View>
);

export default Header;
