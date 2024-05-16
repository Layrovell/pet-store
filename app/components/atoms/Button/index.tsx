import React from 'react';
// @ui-kitten
import { Button as UIButton, ButtonProps } from '@ui-kitten/components';

interface Props extends ButtonProps {};

const Button: React.FC<Props> = (props) => {
  return (
    <UIButton {...props}>{props?.children}</UIButton>
  );
};

export default Button;
