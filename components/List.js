import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

import ListItem from './ListItem';

const url = 'http://media.mw.metropolia.fi/wbma/';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("'response json data:", json);
      setMediaArray(json);
    } catch (error) {
      console.error('loadMedia error', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);
  return (
    <>
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ListItem singleMedia={item} />}
      />
    </>
  );
};

export default List;
