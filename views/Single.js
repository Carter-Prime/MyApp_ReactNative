import React from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import {Text, Card, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

const url = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route, navigation}) => {
  const {file} = route.params;
  console.log(file);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <Card>
        <Card.Image
          source={{uri: url + file.filename}}
          style={{
            width: 400,
            height: 400,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Card.Divider />
        <Card.Title style={{fontSize: 32}}>{file.title}</Card.Title>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Icon name="book" size={32} />
          <Text
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          >
            {file.description}{' '}
          </Text>
        </View>
      </Card>
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
