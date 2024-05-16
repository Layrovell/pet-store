import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../atoms/Button';

interface Props {
  title: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<Props> = ({ title, disabled }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      onPress={(ev: any) => handleSubmit(ev)}
      disabled={disabled}
      size='large'
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
