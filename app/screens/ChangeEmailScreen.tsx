import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FormField, SubmitButton } from '../components/forms';
import Stack from '@components/Stack';
import Screen from '@components/Screen';

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().label('New email'),
  password: Yup.string().label('Password'),
  repeatPassword: Yup.string().label('Repeat password'),
});

interface Props {}

const ChangeEmailScreen: React.FC<Props> = () => {
  const handleSubmit = async (data: any) => {
    console.log('handleSubmit');
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
              <SubmitButton title={'Save'} disabled={false} />
            </Stack>
          );
        }}
      </Formik>
    </Screen>
  );
};

export default ChangeEmailScreen;
