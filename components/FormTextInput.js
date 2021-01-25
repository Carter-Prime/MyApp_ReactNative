import React from 'react';
import {Input} from 'react-native-elements';

const FormTextInput = ({...otherProps}) => {
  return (
    <Input
      placeholder="BASIC INPUT"
      {...otherProps}
      containerStyle={{height: 40}}
      inputContainerStyle={{borderBottomColor: 'grey'}}
      placeholderTextColor="black"
      inputStyle={{fontSize: 14, paddingLeft: 5}}
    />
  );
};

export default FormTextInput;
