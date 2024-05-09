import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';

interface Props {
  onPress?: () => void;
  name: any;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  styles?: any;
}

const IconButton: React.FC<Props> = ({
  onPress,
  styles,
  name,
  size = 40,
  backgroundColor,
  iconColor = colors.grey[90],
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={{
          padding: 8,
          borderRadius: 50,
          backgroundColor: backgroundColor || '',
          justifyContent: 'center',
          alignItems: 'center',
          ...styles,
        }}
      >
        <MaterialIcons name={name} size={size} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
