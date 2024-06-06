import React, { useEffect, useMemo, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import { ErrorMessage, FormField, SubmitButton } from '../components/forms';
import useAuthService from 'controllers/auth/service';
import Screen from '@components/Screen';
import Stack from '@components/Stack';

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().required('New email is required'),
  password: Yup.string().required('Password is required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

interface Props {}

const initialValues = { newEmail: '', password: '', repeatPassword: '' };

const ChangeEmailScreen: React.FC<Props> = () => {
  const [updateEmailMessage, setUpdateEmailMessage] = useState('');
  const { data: user, updateEmail, error, loading, status } = useAuthService();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (user?.id) {
        updateEmail(user.id, { password: values.password, email: values.newEmail });
      }
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    setUpdateEmailMessage('');
    if (status.updateEmail === 200) {
      setUpdateEmailMessage('Email updated successfully');
      formik.resetForm();
    }
  }, [status.updateEmail]);

  const disabled = useMemo(() => {
    return !formik.isValid || !formik.values.newEmail || !formik.values.password || !formik.values.repeatPassword;
  }, [formik]);

  return (
    <Screen>
      <FormikProvider value={formik}>
        <Stack spacing={4}>
          <FormField label='New email' name='newEmail' />
          <FormField label='Password' name='password' />
          <FormField label='Repeat password' name='repeatPassword' />
          <SubmitButton title={'Save'} disabled={disabled} loading={loading.updateEmail} />
        </Stack>
      </FormikProvider>

      <ErrorMessage error={error.updateEmail} status={'error'} />
      <ErrorMessage error={updateEmailMessage} status={'success'} />
    </Screen>
  );
};

export default ChangeEmailScreen;
