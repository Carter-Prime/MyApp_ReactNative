import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

const url = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route, navigation}) => {
  const {file, title} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: url + file}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    color: '#560266',
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
