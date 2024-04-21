import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  onPress?: () => void;
  name: any;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  styles?: any;
}

const IconButton: React.FC<Props> = ({ onPress, styles, name, size = 40, backgroundColor, iconColor = '#fff' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor || '',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <FontAwesome name={name} size={size} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
