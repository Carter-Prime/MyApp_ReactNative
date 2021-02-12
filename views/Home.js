import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View>
        <List navigation={navigation} myFilesOnly={false} />
      </View>
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default Home;
