import React from "react";
import { Formik } from "formik";

interface Props {
  initialValues: any;
  onSubmit: any;
  validationSchema: any;
  children: JSX.Element;
}

const AppForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <>{children}</>
        );
      }}
    </Formik>
  );
};

export default AppForm;
