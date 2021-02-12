import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import {Text, Card, Avatar} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Video} from 'expo-av';
import {useUser, useTag} from '../components/hooks/ApiHooks';
import {uploadUrl} from '../utils/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import {ScrollView} from 'react-native-gesture-handler';

const url = 'https://media-new.mw.metropolia.fi/wbma/uploads/';

const Single = ({route, navigation}) => {
  const {file} = route.params;
  const [owner, setOwner] = useState('');
  const {getFilesByTag} = useTag();
  const {getUser} = useUser();
  const [avatarImg, setAvatarImg] = useState('https://placekitten.com/64');
  const [videoRef, setVideoRef] = useState(null);

  const unlock = async () => {
    await ScreenOrientation.unlockAsync();
  };

  const lock = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const showVideoFullscreen = async () => {
    try {
      if (videoRef) await videoRef.presentFullscreenPlayer();
    } catch (error) {
      console.error('fullscreen error', error);
    }
  };

  const dismissVideoFullscreen = async () => {
    try {
      if (videoRef) await videoRef.dismissFullscreenPlayer();
    } catch (error) {
      console.error('fullscreen error', error);
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarList = await getFilesByTag('avatar_' + file.user_id);
      if (avatarList.length > 0) {
        setAvatarImg(uploadUrl + avatarList.pop().filename);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOwner = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await getUser(file.user_id, userToken);
      setOwner(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    unlock();
    fetchAvatar();
    fetchOwner();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        showVideoFullscreen();
      } else {
        dismissVideoFullscreen();
      }
    });
    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, [videoRef]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <>
            {file.media_type === 'image' ? (
              <Card.Image
                source={{uri: url + file.filename}}
                style={styles.cardImg}
                PlaceholderContent={<ActivityIndicator />}
              />
            ) : (
              <Video
                ref={handleVideoRef}
                source={{uri: url + file.filename}}
                style={styles.cardImg}
                useNativeControls={true}
                resizeMode="cover"
                onError={(error) => {
                  console.error('video', error);
                }}
              />
            )}
          </>
          <Card.Divider />
          <Card.Title style={styles.cardTitle}>{file.title}</Card.Title>
          <View style={styles.cardDetails}>
            <Avatar square source={{uri: avatarImg}} size={30} />
            <Text style={styles.text}>{file.description}</Text>
            <Text>{owner.username}</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    flexDirection: 'row',
    padding: 10,
  },
  cardImg: {
    width: 300,
    height: 300,
  },
  cardTitle: {
    fontSize: 32,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
