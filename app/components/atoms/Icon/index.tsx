import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon as UIIcon, IconProps, IconElement } from '@ui-kitten/components';

interface Props extends IconProps {
  onPress?: (v?: any) => void;
  isAction?: boolean;
}

const Icon: React.FC<Props> = (props): IconElement => {
  return (
    <TouchableOpacity onPress={props?.onPress} activeOpacity={props?.isAction ? 0.4 : 1}>
      <UIIcon
        width={props.size || 22}
        height={props.size || 22}
        {...props}
      />
    </TouchableOpacity>
  );
};

export default Icon;
