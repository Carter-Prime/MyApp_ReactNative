import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

const ActionBarIcon = ({iconName, onBack, color}) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onBack}>
      <Icon name={iconName} size={30} color={color} />
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
  onBack: PropTypes.func,
  color: PropTypes.string,
};

export default ActionBarIcon;
