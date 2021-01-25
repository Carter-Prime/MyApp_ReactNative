import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet} from 'react-native';
import {Text, Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainContext} from '../contexts/MainContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUser} from '../components/hooks/ApiHooks';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser, loaded} = useContext(MainContext);
  console.log(isLoggedIn);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (error) {
        console.error('getToken error', error);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!loaded) {
    return null;
  } else {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Card containerStyle={styles.loginContainer}>
          <Card.Title>Login</Card.Title>
          <Card.Divider />
          <LoginForm navigation={navigation} />
        </Card>
        <Card containerStyle={styles.registerContainer}>
          <Card.Title>Registration</Card.Title>
          <Card.Divider />
          <RegisterForm navigation={navigation} />
        </Card>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
  },
  registerContainer: {
    width: '80%',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
