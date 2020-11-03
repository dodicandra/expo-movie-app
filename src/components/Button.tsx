import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, GestureResponderEvent, ViewStyle} from 'react-native';

interface Props {
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
  color?: string;
  per?: boolean;
  backGround?: string;
  paddingHorizontal?: number;
  style?: ViewStyle;
}

const Button: React.FC<Props> = ({text, onPress, color, per, backGround, paddingHorizontal, style}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text adjustsFontSizeToFit style={[styles.text, style, {color, backgroundColor: backGround, paddingHorizontal}]}>
        {text}
        {per && <Text style={styles.span}> /10</Text>}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0
  },
  text: {
    borderRadius: 9,
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 1.3,
    paddingVertical: 10
  },
  span: {
    fontSize: 9
  }
});

Button.defaultProps = {
  backGround: 'rgba(0,0,0,0.5)',
  paddingHorizontal: 12
};

export default Button;
