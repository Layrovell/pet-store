import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { FormField, SubmitButton } from '../components/forms';
import Screen from '@components/Screen';
import Stack from '@components/Stack';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().label('Old password'),
  newPassword: Yup.string().label('New password'),
  repeatPassword: Yup.string().label('Repeat password'),
});

interface Props {}

const ChangePasswordScreen: React.FC<Props> = () => {
  const handleSubmit = async (data: any) => {
    console.log('handleSubmit');
  };

  return (
    <Screen>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', repeatPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => {
          return (
            <Stack spacing={4}>
              <FormField label='Old password' name='oldPassword' placeholder='First name' />
              <FormField label='New password' name='newPassword' placeholder='User name' />
              <FormField label='Repeat password' name='repeatPassword' placeholder='Last name' />
              <SubmitButton title={'Change Password'} disabled={false} />
            </Stack>
          );
        }}
      </Formik>
    </Screen>
  );
};

export default ChangePasswordScreen;
