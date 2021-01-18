import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffb303" barStyle="light-content" />
      <ImageBackground
        source={require('../assets/image/title-background.jpg')}
        style={styles.titleBackground}
      >
        <Text style={styles.titleText}>Image List</Text>
      </ImageBackground>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#560266',
    padding: 5,
  },
  icon: {
    color: 'white',
  },

  titleBackground: {
    width: '100%',
    height: 200,
  },
  titleText: {
    width: '100%',
    position: 'absolute',
    fontSize: 50,
    fontWeight: '700',
    bottom: 30,
    left: 5,
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 4,
      height: 6,
    },
    textShadowRadius: 11.14,
    shadowOpacity: 0.46,
    elevation: 17,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
