import React from 'react';
import { Text, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';

interface Props {
  children: any;
  style?: any;
  numberOfLines?: number;
}

const AppText: React.FC<Props> = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

// or from a specific separate file
const styles = StyleSheet.create({
  // text: {
  //   fontSize: 18,
  //   fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  // },
});

export default AppText;
