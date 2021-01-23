import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

import ImageHeader from '../components/ImageHeader';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

const Home = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/image/watercolor-blue.png')}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ImageHeader
          backgroundImage={require('../assets/image/title-background.jpg')}
          titleText="Image List"
        />

        <View>
          <List navigation={navigation} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomRightRadius: 15,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
