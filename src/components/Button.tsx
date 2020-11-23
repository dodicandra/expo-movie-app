import React, {memo} from 'react';
import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

interface Props {
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
  color?: string;
  per?: boolean;
  backGround?: string;
  paddingHorizontal?: number;
  style?: ViewStyle;
  disabled?: boolean;
  uniq?: any;
}

const Button: React.FC<Props> = ({disabled, text, onPress, color, per, backGround, paddingHorizontal, style, uniq}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <SharedElement id={`button.red.${uniq}`}>
        <View style={styles.container}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.text, style, {color, backgroundColor: backGround, paddingHorizontal}]}
          >
            {text}
            {per && (
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.span}>
                /10
              </Text>
            )}
          </Text>
        </View>
      </SharedElement>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5
  },
  text: {
    borderRadius: 9,
    textTransform: 'uppercase',
    fontSize: 14,
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

export default memo(Button);
