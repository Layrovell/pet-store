import React from "react";
import { DimensionValue } from "react-native";
import { useFormikContext } from 'formik';

import TextInput from "../TextInput";
import ErrorMessage from './ErrorMessage';

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
}

const AppFormField: React.FC<Props> = ({ name, width, ...otherProps }) => {
  const { errors, touched, setFieldTouched, handleChange } = useFormikContext();  

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      {/* @ts-ignore */}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
