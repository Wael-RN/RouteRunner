import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

export const Input: React.FC<TextInputProps> = props => {
  return <TextInput placeholder="text" {...props} />;
};
