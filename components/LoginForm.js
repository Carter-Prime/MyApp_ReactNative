import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from './hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useLoginForm from './hooks/LoginHooks';

const LoginForm = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();
  const {postLogin} = useLogin();

  const doLogin = async () => {
    setLoading(true);
    try {
      const userData = await postLogin(inputs);
      if (userData) {
        setUser(userData.user);
        setIsLoggedIn(true);
      }
      await AsyncStorage.setItem('userToken', userData.token);
      setLoading(false);
    } catch (error) {
      console.error('postLogin error', error);
      alert.alert(error.message);
      setLoading(false);
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login" raised onPress={doLogin} loading={loading} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
