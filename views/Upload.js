import React, {useState, useEffect, useContext} from 'react';
import {Platform, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {Input, Text, Image, Button} from 'react-native-elements';
import useUploadForm from './../components/hooks/UploadHooks';
import {useMedia} from './../components/hooks/ApiHooks';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [filetype, setFiletype] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const {update, setUpdate} = useContext(MainContext);
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    uploadErrors,
    reset,
  } = useUploadForm();
  const {upload} = useMedia();

  const doUpload = async () => {
    const formData = new FormData();
    // add text to formData
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    // add image to formData
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `${filetype}/${match[1]}` : filetype;
    if (type === 'image/jpg') type = 'image/jpeg';
    formData.append('file', {
      uri: image,
      name: filename,
      type: type,
    });
    try {
      setIsUploading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await upload(formData, userToken);
      if (resp.status === 201) {
        Alert.alert(
          'Upload',
          'File uploaded',
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                doReset();
                navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (error) {
      Alert.alert('Upload', 'Failed');
      console.error(error);
    } finally {
      setIsUploading(false);
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

  const doReset = () => {
    setImage(null);
    reset();
  };

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

      if (!result.cancelled) {
        setFiletype(result.type);
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
      {isUploading && <ActivityIndicator size="large" color="#0000ff" />}

      <Button
        title="Upload File"
        onPress={doUpload}
        type="solid"
        raised
        containerStyle={styles.button}
      />
      <Button
        title="Reset"
        onPress={doReset}
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
