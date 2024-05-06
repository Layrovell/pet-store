import React from "react";
import { Formik } from "formik";
import { View } from "react-native";

interface Props {
  initialValues: any;
  onSubmit?: any;
  validationSchema: any;
  children: JSX.Element | JSX.Element[];
  style?: any;
}

const AppForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  style,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <View style={style}>{children}</View>
        );
      }}
    </Formik>
  );
};

export default AppForm;
