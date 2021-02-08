import React from 'react';
import {View, SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import {Text, Card, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Video} from 'expo-av';

const url = 'https://media-new.mw.metropolia.fi/wbma/uploads/';

const Single = ({route, navigation}) => {
  const {file} = route.params;
  console.log(file);
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <>
          {file.media_type === 'image' ? (
            <Card.Image
              source={{uri: url + file.filename}}
              style={styles.cardImg}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            <Video
              source={{uri: url + file.filename}}
              style={styles.cardImg}
              useNativeControls={true}
            />
          )}
        </>
        <Card.Divider />
        <Card.Title style={styles.cardTitle}>{file.title}</Card.Title>
        <View style={styles.cardDetails}>
          <Icon name="book" size={32} />
          <Text style={styles.text}>{file.description}</Text>
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    flexDirection: 'row',
    padding: 10,
  },
  cardImg: {
    width: 300,
    height: 300,
  },
  cardTitle: {
    fontSize: 32,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
