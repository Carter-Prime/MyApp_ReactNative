import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';

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

const mediaArray = [
  {
    key: '0',
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Title 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/164',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Title 3',
    description:
      'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/167',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

export default ListItem;
