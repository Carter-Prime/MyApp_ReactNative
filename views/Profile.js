import React, {useContext, useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Text, Icon, Button} from 'react-native-elements';
import {useTag} from '../components/hooks/ApiHooks';

const url = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const {getAvatar} = useTag();
  const [avatarImg, setAvatarImg] = useState('');

  console.log('profile', isLoggedIn);
  console.log('profile userData: ', user);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const loadAvatar = async () => {
    const tag = 'Avatar_' + user.user_id;
    try {
      const getAvatarImage = await getAvatar(tag, user.token);
      setAvatarImg(getAvatarImage);
    } catch (error) {
      console.error('getAvatar error', error);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}
    >
      <View style={{flexDirection: 'row', padding: 10}}>
        <Icon name="person" size={24} />
        <Text style={styles.text}>Username: {user.username}</Text>
      </View>

      <Avatar square source={{uri: url + avatarImg}} size={300} />
      <View
        style={{
          flex: 0.15,
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <Text style={styles.textBody}>Fullname: {user.full_name}</Text>
        <Text style={styles.textBody}>email: {user.email}</Text>
      </View>

      <Button
        title={'Logout'}
        raised
        onPress={logout}
        containerStyle={{width: 300}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#4392f1',
    fontWeight: 'bold',
  },

  textBody: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
