import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

const url = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({singleMedia}) => {
  const [modelVisible, setModelVisible] = useState(false);
  return (
    <>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => setModelVisible(true)}>
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
      <Modal animationType="slide" visible={modelVisible}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setModelVisible(false)}
            style={styles.iconContainer}
          >
            <Icon name="x" size={40} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image
            style={styles.enlargedImage}
            source={{uri: url + singleMedia.thumbnails.w640}}
          />
        </View>
      </Modal>
    </>
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
    backgroundColor: '#560266',
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

  modalView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#560266',
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
};

export default ListItem;
