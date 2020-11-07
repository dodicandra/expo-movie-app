import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from 'types';

interface Props {
  size: number;
  color?: string;
  borderColor?: string;
}

const Box: React.FC<Props> = ({children, size, borderColor = Color.grey1, color = 'transparent'}) => {
  return (
    <View style={[styles.container, {height: size, width: size, borderRadius: size! / 5, borderColor, backgroundColor: color}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Box;
