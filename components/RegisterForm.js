import React, {useContext} from 'react';
import {Alert, Button, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MainContext} from '../contexts/MainContext';
import {useRegister, useLogin} from './hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from './hooks/RegisterHooks';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useSignUpForm();
  const {postRegister} = useRegister();
  const {postLogin} = useLogin();

  const doRegister = async () => {
    try {
      const result = await postRegister(inputs);
      console.log('doRegister ok', result.message);
      Alert.alert(result.message);
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData);
    } catch (error) {
      console.log('registration error', error);
      Alert.alert('register fail', error.message);
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
      <FormTextInput
        style={styles.form}
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        style={styles.form}
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button style={styles.btn} title="Register" onPress={doRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    height: 300,
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

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
