import {useState, useEffect} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('doFetch failed');
  }
  return await response.json();
};

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

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
    loadMedia();
  }, []);
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
    console.log('trying to create user', inputs);
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
      console.log('register resp', registerJson);
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
  return {postRegister, checkToken};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const filesByTag = await doFetch(apiUrl + 'tags/' + tag);
      console.log(filesByTag);
      return filesByTag;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {getFilesByTag};
};

export {useLoadMedia, useLogin, useUser, useTag};
