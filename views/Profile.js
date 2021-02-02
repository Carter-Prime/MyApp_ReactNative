import React, {useContext, useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Text, Icon, Button} from 'react-native-elements';
import {useTag} from '../components/hooks/ApiHooks';

const url = 'https://media-new.mw.metropolia.fi/wbma/uploads/';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [avatarImg, setAvatarImg] = useState('https://placekitten.com/64');

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarList = await getFilesByTag('Avatar_' + user.user_id);
        if (avatarList.length > 0) {
          setAvatarImg(url + avatarList.pop().filename);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.usernameDetails}>
        <Icon name="person" size={24} />
        <Text style={styles.text}>Username: {user.username}</Text>
      </View>

      <Avatar square source={{uri: avatarImg}} size={300} />
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
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#4392f1',
    fontWeight: 'bold',
  },

  textBody: {
    flex: 1,
    marginLeft: 20,
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  usernameDetails: {
    flexDirection: 'row',
    padding: 10,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
