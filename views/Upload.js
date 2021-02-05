import React, {useState, useEffect} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Input, Text, Image, Button} from 'react-native-elements';
import useUploadForm from './../components/hooks/UploadHooks';
import {useMedia} from './../components/hooks/ApiHooks';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import PropTypes from 'prop-types';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    uploadErrors,
  } = useUploadForm();
  const {upload} = useMedia();

  const doUpload = async () => {
    const formData = new FormData();
    // addd text to formData
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    // add image to formData
    formData.append('file', {uri: image, name: 'filename', type: 'image/jpeg'});
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await upload(formData, userToken);
      if (resp.status === 201) {
        setTimeout(() => {
          const pushAction = StackActions.push('Home');
          navigation.dispatch(pushAction);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async (library) => {
    let result = null;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    try {
      if (library) {
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        result = await ImagePicker.launchCameraAsync(options);
      }

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <Text>Upload Media File</Text>
      {image && (
        <Image
          source={{uri: image}}
          style={{width: '100%', height: undefined, aspectRatio: 1}}
        />
      )}
      <Input
        autoCapitalize="none"
        placeholder="title"
        value={inputs.title}
        onChangeText={(txt) => handleInputChange('title', txt)}
        onEndEditing={(event) => {
          handleInputEnd('title', event.nativeEvent.text);
        }}
        errorMessage={uploadErrors.title}
      />
      <Input
        placeholder="description"
        autoCapitalize="none"
        value={inputs.description}
        onChangeText={(txt) => handleInputChange('description', txt)}
        onEndEditing={(event) => {
          handleInputEnd('description', event.nativeEvent.text);
        }}
        errorMessage={uploadErrors.description}
      />
      <Button
        title="Select File from Library"
        onPress={() => pickImage(true)}
        type="solid"
        raised
        containerStyle={styles.button}
      />
      <Button
        title="Use Camera"
        onPress={() => pickImage(false)}
        type="solid"
        raised
        containerStyle={styles.button}
      />
      <Button
        title="Upload File"
        onPress={doUpload}
        type="solid"
        raised
        containerStyle={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
