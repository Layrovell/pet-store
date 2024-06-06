import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ErrorMessage, FormField, SubmitButton } from '../components/forms';
import Screen from '@components/Screen';
import Stack from '@components/Stack';
import useAuthService from 'controllers/auth/service';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().required('New password is required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
});

interface Props {}

const ChangePasswordScreen: React.FC<Props> = () => {
  const [updatePasswordResponse, setUpdatePasswordResponse] = useState('');

  const { data: user, updatePassword, error, loading, notifications } = useAuthService();

  const handleSubmit = async (data: any) => {
    if (user?.id) {
      await updatePassword(user.id, { password: data.newPassword, oldPassword: data.oldPassword });
    }
  };

  useEffect(() => {
    setUpdatePasswordResponse(notifications.updatePassword);
  }, [notifications.updatePassword]);

  return (
    <Screen>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', repeatPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isValid }) => {
          return (
            <Stack spacing={4}>
              <FormField label='Old password' name='oldPassword' />
              <FormField label='New password' name='newPassword' />
              <FormField label='Repeat new password' name='repeatPassword' />
              <SubmitButton title={'Change Password'} disabled={false} loading={loading.updatePassword} />
            </Stack>
          );
        }}
      </Formik>

      <ErrorMessage error={error.updatePassword} status={'error'} />
      <ErrorMessage error={updatePasswordResponse} status={'info'} />
    </Screen>
  );
};

export default ChangePasswordScreen;
