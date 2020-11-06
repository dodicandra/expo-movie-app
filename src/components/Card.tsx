import React, {forwardRef} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

interface Props {
  src: ImageSourcePropType;
  title?: string;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ITEM_W = width * 0.5;

const Card: React.RefForwardingComponent<TouchableOpacity, Props> = ({src, title, style, onPress}, ref) => {
  return (
    <Animated.View style={[style, styles.container]}>
      <Image resizeMode="cover" style={styles.img} source={src} />
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
        {title}
      </Text>
    </Animated.View>
  );
};

export default forwardRef(Card);

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
