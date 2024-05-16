import React from 'react';
// @ui-kitten
import { Input as UIInput, InputProps } from '@ui-kitten/components';

import Typography from '../../Typography';

interface Props extends InputProps {
  errorMessage?: string;
}

const Input: React.FC<Props> = (props) => {
  const renderCaption = (): React.ReactElement => {
    return (
      <Typography>{props?.errorMessage}</Typography>
    );
  };

  return (
    <UIInput
      value={props?.value}
      label={props?.label}
      placeholder={props?.placeholder}
      caption={renderCaption}
      size={props?.size || 'large'}
      secureTextEntry={props?.secureTextEntry}
      {...props}
    />
  );
};

export default Input;
