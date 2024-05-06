import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../Button';
import colors from '../../config/colors';

interface Props {
  title: string;
  color?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<Props> = ({ title, color = colors.secondary.main, disabled }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      color={color}
      radius={30}
      size='lg'
      disabled={disabled}
    />
  )
};

export default SubmitButton;
