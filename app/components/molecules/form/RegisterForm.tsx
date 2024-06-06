import React from 'react';

import { FormField } from '../../forms';
import Stack from '../../Stack';

interface Props {
  formError: string | null;
}

const RegisterForm: React.FC<Props> = ({ formError }) => {
  return (
    <Stack spacing={4} style={{ marginBottom: 36 }}>
      <FormField label={'User name'} name='username' />
      <FormField label={'First name'} name='firstname' />
      <FormField label={'Last name'} name='lastname' />
      <FormField
        label={'Email address'}
        autoCapitalize='none'
        keyboardType='email-address'
        name='email'
        textContentType='emailAddress'
      />
      <FormField
        label={'Password'}
        autoCapitalize='none'
        name='password'
        secureTextEntry
        textContentType='password'
      />
    </Stack>
  );
};

export default RegisterForm;
