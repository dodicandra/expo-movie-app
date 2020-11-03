import React from 'react';
import {StyleSheet, View, TextInput, Text, Dimensions, TouchableOpacity} from 'react-native';
import Search from '../../assets/svg/search.svg';
import Menu from '../../assets/svg/menu.svg';
import Box from './Box';

const {width, height} = Dimensions.get('window');

const SearchBar: React.FC = () => {
  return (
    <View style={styles.wraper}>
      <Box size={height * 0.07}>
        <TouchableOpacity>
          <Menu width={20} height={20} fill="#c8c8c8" />
        </TouchableOpacity>
      </Box>
      <View style={[styles.container]}>
        <TextInput numberOfLines={1} allowFontScaling placeholderTextColor="#c8c8c8" style={styles.input} placeholder="Search Films..." />
        <Search width={25} height={25} fill="#c8c8c8" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    display: 'flex',
    width: '100%',
    marginTop: height * 0.03,
    zIndex: 10
  },
  container: {
    width: width * 0.7,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#c8c8c8',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: height * 0.07
  },
  input: {
    fontSize: 15,
    flex: 1,
    marginRight: 10,
    letterSpacing: 1.3,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {
      height: 1,
      width: 1
    },
    textShadowRadius: 3
  }
});

export default SearchBar;
