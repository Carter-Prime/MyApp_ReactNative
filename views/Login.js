import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../components/hooks/ApiHooks';

const Login = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log(isLoggedIn);

  const {postLogin, checkToken} = useLogin();

  const logIn = async () => {
    const testUser = {
      username: 'michaejc',
      password: 'Test123',
    };
    try {
      const userData = await postLogin(testUser);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (error) {
      console.error('postLogin error', error);
      // Todo: add user notification here about login error
    }
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        await checkToken(userToken);
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } catch (error) {
        console.error('getToken error', error);
      }
    }
  };

  useEffect(() => {
    getToken();
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
