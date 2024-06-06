import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../atoms/Button';
import { ButtonProps } from '@ui-kitten/components';

interface Props extends ButtonProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const SubmitButton: React.FC<Props> = ({ title, disabled, loading, ...props }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      onPress={(ev: any) => handleSubmit(ev)}
      disabled={disabled}
      size='large'
      loading={loading}
      {...props}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
