import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ErrorMessage, FormField, SubmitButton } from '../components/forms';
import useAuthService from 'controllers/auth/service';
import Screen from '@components/Screen';
import Stack from '@components/Stack';

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().label('New email'),
  password: Yup.string().label('Password'),
  repeatPassword: Yup.string().label('Repeat password'),
});

interface Props {}

const ChangeEmailScreen: React.FC<Props> = () => {
  const [updatePasswordResponse, setUpdatePasswordResponse] = useState('');
  const { data: user, updateEmail, error, loading } = useAuthService();

  const handleSubmit = async (data: any) => {
    if (user?.id) {
      const response = updateEmail(user.id, { password: data.password, email: data.newEmail });
      if (response) {
        setUpdatePasswordResponse('Email updated successfully');
      }
    }
  };

  return (
    <Screen>
      <Formik
        initialValues={{ newEmail: '', password: '', repeatPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => {
          return (
            <Stack spacing={4}>
              <FormField label='New email' name='newEmail' placeholder='First name' />
              <FormField label='Password' name='password' placeholder='User name' />
              <FormField label='Repeat password' name='repeatPassword' placeholder='Last name' />
              <SubmitButton title={'Save'} disabled={false} loading={loading.updateEmail} />
            </Stack>
          );
        }}
      </Formik>

      <ErrorMessage error={error.updateEmail} status={'error'} />
      <ErrorMessage error={updatePasswordResponse} status={'info'} />
    </Screen>
  );
};

export default ChangeEmailScreen;
