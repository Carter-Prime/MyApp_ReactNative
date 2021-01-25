import React from 'react';
import {Text, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';

const ImageHeader = ({backgroundImage, titleText}) => {
  return (
    <ImageBackground source={backgroundImage}>
      <Text>{titleText}</Text>
    </ImageBackground>
  );
};

ImageHeader.propTypes = {
  backgroundImage: PropTypes.number.isRequired,
  titleText: PropTypes.string,
};
export default ImageHeader;
