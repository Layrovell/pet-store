import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../Button';
import colors from '../../config/colors';

interface Props {
  title: string;
  color?: keyof typeof colors;
}

const SubmitButton: React.FC<Props> = ({ title, color = 'primary' }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      color={color}
    />
  )
};

export default SubmitButton;
