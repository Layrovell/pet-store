import React from "react";
import { TextInputProps } from 'react-native';
import { useFormikContext, useField } from 'formik';

import Input from '../atoms/Input';

interface Props extends TextInputProps {
  name: string;
  label?: string;
  size?: string;
  accessoryRight?: (iconProps?: any) => React.ReactElement;
}

const AppFormField: React.FC<Props> = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange } = useFormikContext();

  const [field, meta] = useField(name);

  return (
    <Input
      // onBlur={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      caption={meta.error}
      status={meta.error ? 'danger' : 'basic'}
      {...field}
      {...otherProps}
    />
  );
};

export default AppFormField;
