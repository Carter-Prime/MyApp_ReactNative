import React, {useContext} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from './hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useLoginForm from './hooks/LoginHooks';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      if (userData) {
        setIsLoggedIn(true);
      }
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (error) {
      console.error('postLogin error', error);
      alert.alert(error.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <FormTextInput
        style={styles.form}
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        style={styles.form}
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button style={styles.btn} title="Login" onPress={doLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    height: 200,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  form: {
    width: 200,
    backgroundColor: 'white',
    padding: 10,
  },
  btn: {
    margin: 10,
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
