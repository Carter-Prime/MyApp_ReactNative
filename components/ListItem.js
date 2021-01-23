import React from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const url = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Single', {
            file: singleMedia.filename,
            title: singleMedia.title,
          });
        }}
      >
        <Image
          style={styles.image}
          source={{uri: url + singleMedia.thumbnails.w160}}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.description}>{singleMedia.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    elevation: 5,
    backgroundColor: '#55AAAA',
    marginBottom: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  enlargedImage: {
    width: 400,
    height: 400,
    alignSelf: 'center',
  },

  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    color: 'white',
  },
  textContainer: {
    width: 160,
    marginTop: 5,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 11.14,
    shadowOpacity: 0.46,
    elevation: 4,
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

export default ListItem;
