import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Color} from 'types';

interface Props {
  size: number;
  color?: string;
  borderColor?: string;
  style?: ViewStyle;
}

const Box: React.FC<Props> = ({children, size, borderColor = Color.grey1, color = 'transparent', style}) => {
  return (
    <View style={[style, styles.container, {height: size, width: size, borderRadius: size / 5, borderColor, backgroundColor: color}]}>
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
