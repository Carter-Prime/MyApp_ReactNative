import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';

import {useLoadMedia} from './hooks/ApiHooks';
import ListItem from './ListItem';

const List = ({navigation}) => {
  const mediaArray = useLoadMedia();
  return (
    <>
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ListItem navigation={navigation} singleMedia={item} />
        )}
      />
    </>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
