import React from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';

const ImageHeader = ({backgroundImage, titleText}) => {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.titleBackground}
      imageStyle={styles.image}
    >
      <Text style={styles.titleText}>{titleText}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  titleBackground: {
    width: '100%',
    height: 200,
  },

  image: {
    borderBottomRightRadius: 60,
  },

  titleText: {
    width: '100%',
    position: 'absolute',
    fontSize: 50,
    fontWeight: '700',
    bottom: 30,
    left: 5,
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 4,
      height: 6,
    },
    textShadowRadius: 11.14,
    shadowOpacity: 0.46,
    elevation: 17,
  },
});

ImageHeader.propTypes = {
  backgroundImage: PropTypes.number.isRequired,
  titleText: PropTypes.string,
};
export default ImageHeader;
