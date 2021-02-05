import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {MainContext} from '../../contexts/MainContext.js';

const apiUrl = 'https://media-new.mw.metropolia.fi/wbma/';

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  const loadMedia = async (limit = 10) => {
    try {
      const mediaListResponse = await fetch(apiUrl + 'media?limit=' + limit);
      const mediaListJson = await mediaListResponse.json();

      const media = await Promise.all(
        mediaListJson.map(async (item) => {
          const fileResponse = await fetch(apiUrl + 'media/' + item.file_id);
          const fileJson = await fileResponse.json();
          return fileJson;
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.error('loadMedia error', error);
    }
  };

  useEffect(() => {
    loadMedia(10);
  }, [update]);
  return mediaArray;
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      const userDataJson = await doFetch(apiUrl + 'login', options);
      return userDataJson;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const postRegister = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const registerResponse = await fetch(apiUrl + 'users', fetchOptions);
      const registerJson = await registerResponse.json();
      if (registerResponse.ok) {
        return registerJson;
      } else {
        throw new Error(registerJson.message + ': ' + registerJson.error);
      }
    } catch (e) {
      console.log('ApiHooks register', e.message);
      throw new Error(e.message);
    }
  };

  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const checkTokenResponse = await fetch(apiUrl + 'users/user', options);
      const userData = checkTokenResponse.json();
      if (checkTokenResponse.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkIsUserAvailable = async (username) => {
    try {
      const result = await doFetch(apiUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('apihooks checkIsUserAvailable', error.message);
    }
  };
  return {postRegister, checkToken, checkIsUserAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const filesByTag = await doFetch(apiUrl + 'tags/' + tag);
      // console.log('filesByTag Array', filesByTag);
      return filesByTag;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {getFilesByTag};
};

const useMedia = () => {
  const upload = async (fd, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      data: fd,
      url: apiUrl + 'media',
    };
    try {
      const uploadResponse = await axios(options);
      return uploadResponse;
    } catch (e) {
      console.log('ApiHooks upload', e.message);
      throw new Error(e.message);
    }
  };
  return {upload};
};

export {useLoadMedia, useLogin, useUser, useTag, useMedia};
