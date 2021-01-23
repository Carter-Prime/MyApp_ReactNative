import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const TextDisplay = ({containerStyle, textStyle, labelText, children}) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Text style={[styles.label, textStyle[1]]}>{labelText}: </Text>
      <Text style={[styles.content, textStyle[0]]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 16,
  },
  content: {
    fontSize: 14,
  },
});

TextDisplay.propTypes = {
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  labelText: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default TextDisplay;
