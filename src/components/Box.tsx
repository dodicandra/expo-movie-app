import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  size?: number;
}

const Box: React.FC<Props> = ({children, size}) => {
  return <View style={[styles.container, {height: size, width: size, borderRadius: size! / 5}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c8c8c8',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Box;
