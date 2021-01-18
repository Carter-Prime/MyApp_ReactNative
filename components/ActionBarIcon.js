import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

const ActionBarIcon = ({iconName}) => {
  return (
    <TouchableOpacity style={styles.iconContainer}>
      <Icon name={iconName} size={40} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    margin: 5,
  },
});

ActionBarIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
};

export default ActionBarIcon;
