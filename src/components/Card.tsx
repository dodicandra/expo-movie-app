import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
  Alert,
  StyleProp
} from 'react-native';
import Animated, {Extrapolate} from 'react-native-reanimated';
import Button from './Button';

const {width, height} = Dimensions.get('screen');

interface Props {
  src: ImageSourcePropType;
  title?: string;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ITEM_W = width * 0.5;

const Card: React.FC<Props> = ({src, title, style, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[style, styles.container]}>
        <Image resizeMode="cover" style={styles.img} source={src} />
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: height * 0.28,
    elevation: 5
  },
  img: {
    width: '100%',
    borderRadius: 9,
    height: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    alignSelf: 'center'
  }
});
