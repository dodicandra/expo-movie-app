import React, {memo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {width} = Dimensions.get('screen');

interface Props {
  date?: string;
  genre?: string[];
}

const DetailInfo: React.FC<Props> = ({date, genre}) => {
  const year = new Date(date!).getFullYear();
  const genres = genre?.map(value => ` • ${value}`);
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text}>
        {year}
      </Text>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.genre}>
        {genres}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width * 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  genre: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF'
  }
});

export default memo(DetailInfo);
