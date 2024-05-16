import React from 'react';
import { Icon as UIIcon, IconProps, IconElement } from '@ui-kitten/components';

interface Props extends IconProps {}

const Icon: React.FC<Props> = (props): IconElement => {
  return (
    <UIIcon
      width={props.size || 22}
      height={props.size || 22}
      {...props}
    />
  );
};

export default Icon;
