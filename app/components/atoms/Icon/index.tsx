import React from 'react';
import { Icon as UIIcon, IconProps, IconElement } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends IconProps {
  onPress?: (v?: any) => void;
}

const Icon: React.FC<Props> = (props): IconElement => {
  return (
    <TouchableOpacity onPress={props?.onPress}>
    <UIIcon
      width={props.size || 22}
      height={props.size || 22}
      {...props}
    />
    </TouchableOpacity>
  );
};

export default Icon;
