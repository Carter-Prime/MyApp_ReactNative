import React, {useState} from 'react';
import {TouchableOpacity, Image, Text, View, Modal} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  const [modelVisible, setModelVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => setModelVisible(true)}
      >
        <Image
          style={styles.image}
          source={{uri: singleMedia.thumbnails.w160}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" visible={modelVisible}>
        <TouchableOpacity
          onPress={() => setModelVisible(false)}
          style={styles.modalView}
        >
          <Image
            style={styles.enlargedImage}
            source={{uri: singleMedia.thumbnails.w160}}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#d9d9d9',
    padding: 10,
    marginBottom: 5,
  },
  image: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enlargedImage: {
    width: '90%',
    height: '90%',
  },

  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9d9d9',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
