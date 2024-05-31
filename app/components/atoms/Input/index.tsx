import React, { useMemo } from 'react';
// @ui-kitten
import { Input as UIInput, InputProps } from '@ui-kitten/components';

import Typography from '../../Typography';
import Icon from '../Icon';

interface Props extends InputProps {
  errorMessage?: string;
  handleClear?: () => void;
}

const Input: React.FC<Props> = (props) => {
  const renderCaption = (): React.ReactElement => {
    return (
      <Typography>{props?.errorMessage}</Typography>
    );
  };

  const renderClearableAttribute = useMemo(() => {
    if (props?.handleClear && props?.value) {
      return <Icon name='close-circle' onPress={props?.handleClear} />;
    }
  }, [props?.handleClear]);

  return (
    <UIInput
      value={props?.value}
      label={props?.label}
      placeholder={props?.placeholder}
      caption={renderCaption}
      size={props?.size || 'large'}
      secureTextEntry={props?.secureTextEntry}
      accessoryRight={renderClearableAttribute}
      {...props}
    />
  );
};

export default Input;
