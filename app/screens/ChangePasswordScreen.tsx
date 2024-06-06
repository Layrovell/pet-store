import React, { useEffect, useMemo, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import { ErrorMessage, FormField, SubmitButton } from '../components/forms';
import Screen from '@components/Screen';
import Stack from '@components/Stack';
import useAuthService from 'controllers/auth/service';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  password: Yup.string().required('New password is required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

interface Props {}

const initialValues = { oldPassword: '', password: '', repeatPassword: '' };

const ChangePasswordScreen: React.FC<Props> = () => {
  const [updatePasswordMessage, setUpdatePasswordMessage] = useState('');

  const { data: user, updatePassword, error, loading, status } = useAuthService();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (user?.id) {
        updatePassword(user.id, { password: values.password, oldPassword: values.oldPassword });
      }
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    setUpdatePasswordMessage('');
    if (status.updatePassword === 200) {
      setUpdatePasswordMessage('Password updated successfully');
      formik.resetForm();
    }

    return () => {
      setUpdatePasswordMessage('');
    };
  }, [status.updatePassword]);

  const disabled = useMemo(() => {
    return !formik.isValid || !formik.values.oldPassword || !formik.values.password || !formik.values.repeatPassword;
  }, [formik]);

  return (
    <Screen>
      <FormikProvider value={formik}>
        <Stack spacing={4}>
          <FormField label='Old password' name='oldPassword' />
          <FormField label='New password' name='password' />
          <FormField label='Repeat new password' name='repeatPassword' />
          <SubmitButton title={'Change Password'} disabled={disabled} loading={loading.updatePassword} />
        </Stack>
      </FormikProvider>

      <ErrorMessage error={error.updatePassword} status={'error'} />
      <ErrorMessage error={updatePasswordMessage} status={'success'} />
    </Screen>
  );
};

export default ChangePasswordScreen;
