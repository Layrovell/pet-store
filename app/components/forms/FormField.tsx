import React from "react";
import { DimensionValue, Text } from "react-native";
import { useFormikContext } from 'formik';

import TextInput from "../TextInput";
import ErrorMessage from './ErrorMessage';
import Stack from "../Stack";

interface Props {
  name: string;
  icon?: string;
  placeholder?: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  keyboardType?: string;
  textContentType?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  multiline?: boolean;
  width?: DimensionValue;
  hideIcon?: string;
}

const AppFormField: React.FC<Props> = ({ name, width, ...otherProps }) => {
  const { errors, touched, setFieldTouched, handleChange } = useFormikContext();  

  return (
    <Stack spacing={1}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      {/* @ts-ignore */}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Stack>
  );
};

export default AppFormField;
