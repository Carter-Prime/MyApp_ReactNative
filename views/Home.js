import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

import ImageHeader from '../components/ImageHeader';

const Home = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffb303" barStyle="light-content" />
      <ImageHeader
        backgroundImage={require('../assets/image/title-background.jpg')}
        titleText="Image List"
      />
      <View>
        <List navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf5',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
