import React from 'react';
import {Dimensions, Image, ImageSourcePropType, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

const {width, height} = Dimensions.get('screen');

interface Props {
  src: ImageSourcePropType;
  title?: string;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
}

export const ITEM_W = width * 0.5;

const Card: React.FC<Props> = React.memo(({src, title, style}) => {
  return (
    <Animated.View style={[style, styles.container]}>
      <SharedElement style={styles.img} id={`item.${title}.card`}>
        <Image resizeMode="cover" style={styles.img} source={src} />
      </SharedElement>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
        {title}
      </Text>
    </Animated.View>
  );
});

export default React.memo(Card);

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
