import React from 'react';
import { View } from 'react-native';

interface Props {
  spacing?: number;
  direction?: 'row' | 'column';
  style?: any;
  children: JSX.Element | JSX.Element[];
}

const Stack: React.FC<Props> = ({ spacing, direction, style, children }) => {
  return (
    <View
      style={[
        {
          flexDirection: direction,
          alignItems: direction ? 'center' : '',
          gap: spacing ? 4 * spacing : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
};

export default Stack;
