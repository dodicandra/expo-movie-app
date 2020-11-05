import React from 'react';
import {StyleSheet, View, TextInput, Text, Dimensions, TouchableOpacity} from 'react-native';
import Search from '../../assets/svg/search.svg';
import Menu from '../../assets/svg/menu.svg';
import Box from './Box';

const {width, height} = Dimensions.get('screen');

const SearchBar: React.FC = () => {
  return (
    <View style={styles.wraper}>
      <Box size={height * 0.06}>
        <TouchableOpacity>
          <Menu width={20} height={20} fill="#FFFFFF" />
        </TouchableOpacity>
      </Box>
      <View style={[styles.container]}>
        <TextInput
          numberOfLines={1}
          allowFontScaling
          placeholderTextColor="#FFFFFF"
          style={styles.input}
          placeholder="Search Films..."
        />
        <Search width={25} height={25} fill="#FFFFFF" />
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
    marginTop: height * 0.06,
    zIndex: 10
  },
  container: {
    width: width * 0.7,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: height * 0.06
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
