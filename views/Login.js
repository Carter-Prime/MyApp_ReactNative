import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainContext} from '../contexts/MainContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useLogin} from '../components/hooks/ApiHooks';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser, loaded} = useContext(MainContext);
  console.log(isLoggedIn);
  const {checkToken} = useLogin();

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
      <KeyboardAvoidingView style={styles.flexGrowOne}>
        <ImageBackground
          source={require('../assets/image/watercolor-blue.png')}
          style={styles.container}
        >
          <Text style={styles.loginTitle}>Login</Text>
          <LoginForm navigation={navigation} />
          <RegisterForm navigation={navigation} />
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  flexGrowOne: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  loginTitle: {
    fontSize: 60,
    fontFamily: 'McLarenRegular',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
