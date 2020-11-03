import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
  date?: string;
  genre?: string[];
}

const DetailInfo: React.FC<Props> = ({date, genre}) => {
  const year = new Date(date!).getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{year}</Text>
      {genre?.map(value => (
        <Text suppressHighlighting adjustsFontSizeToFit style={styles.genre} key={value}>
          • {value}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-around',
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

export default DetailInfo;
