import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {Input, Text, Image, Button} from 'react-native-elements';
import useUploadForm from './../components/hooks/UploadHooks';
import {useMedia} from './../components/hooks/ApiHooks';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Upload = () => {
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
      console.log('upload response', resp);
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
          handleInputEnd('title', event.nativeEvent.text);
        }}
        errorMessage={uploadErrors.description}
      />
      <Button
        title="Select File from Library"
        onPress={() => pickImage(true)}
      />
      <Button title="Use Camera" onPress={() => pickImage(false)} />
      <Button title="Upload File" onPress={doUpload} />
    </ScrollView>
  );
};

export default Upload;
