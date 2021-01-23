import React, {useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextDisplay from '../components/TextDisplay';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user, loaded} = useContext(MainContext);
  console.log('profile', isLoggedIn);
  console.log('profile userData: ', user);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.safecontainer}>
      <ImageBackground
        source={require('../assets/image/watercolor-blue.png')}
        style={styles.container}
      >
        <Image
          style={styles.image}
          source={require('../assets/image/title-background1.jpg')}
        />
        <View style={styles.userInfoContainer}>
          <TextDisplay
            labelText="Full Name"
            textStyle={[styles.text, styles.labels]}
          >
            {user.full_name}
          </TextDisplay>
          <TextDisplay
            labelText="Username"
            textStyle={[styles.text, styles.labels]}
          >
            {user.username}
          </TextDisplay>
          <TextDisplay
            labelText="Email"
            textStyle={[styles.text, styles.labels]}
          >
            {user.email}
          </TextDisplay>
        </View>
        <Button title={'Logout'} onPress={logout} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 40,
    fontFamily: 'MontserratSemiBold',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userInfoContainer: {
    flex: 0.15,
    borderWidth: 1,
    borderColor: '#55AAAA',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#ffff',
    elevation: 5,
  },
  text: {
    fontFamily: 'MontserratRegular',
  },
  labels: {
    fontFamily: 'MontserratSemiBold',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
