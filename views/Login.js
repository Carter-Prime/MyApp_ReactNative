import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView, StatusBar} from 'react-native';
import {Text} from 'react-native-elements';
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
      <KeyboardAvoidingView>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Text h4 h4Style={{textAlign: 'center'}}>
          Login
        </Text>
        <LoginForm navigation={navigation} />

        <Text h4 h4Style={{textAlign: 'center'}}>
          Register
        </Text>
        <RegisterForm navigation={navigation} />
      </KeyboardAvoidingView>
    );
  }
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
