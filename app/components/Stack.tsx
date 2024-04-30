import React from 'react';
import { View } from 'react-native';

interface Props {
  spacing?: number;
  style?: any;
  children: JSX.Element | JSX.Element[];
}

const Stack: React.FC<Props> = ({ spacing, style, children }) => {
  return (
    <View style={[style, { gap: spacing ? 4 * spacing : 0 } ]}>
      {children}
    </View>
  )
};

export default Stack;
