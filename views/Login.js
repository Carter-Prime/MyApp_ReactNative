import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainContext} from '../contexts/MainContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUser} from '../components/hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser, loaded} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(true);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
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
      <ImageBackground
        source={require('../assets/image/watercolor-blue.png')}
        style={styles.container}
      >
        <KeyboardAvoidingView style={styles.container}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <Text h1 h1Style={styles.Title}>
            My App
          </Text>
          {formToggle ? (
            <Card>
              <Card.Title>Login</Card.Title>
              <Card.Divider />
              <LoginForm navigation={navigation} style={styles.formContainer} />
            </Card>
          ) : (
            <Card>
              <Card.Title>Registration</Card.Title>
              <Card.Divider />
              <RegisterForm
                navigation={navigation}
                style={styles.formContainer}
              />
            </Card>
          )}
          <Button
            containerStyle={styles.toggleBtn}
            title="Toggle"
            onPress={() => {
              setFormToggle(!formToggle);
            }}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Title: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    marginTop: 40,
  },
  formContainer: {
    flex: 4,
    width: '90%',
    marginBottom: 20,
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  toggleBtn: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
