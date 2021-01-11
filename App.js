import React from 'react';
import GlobalStyles from './GlobalStyles';
import { SafeAreaView } from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <List />
    </SafeAreaView>
  );
};

export default App;
