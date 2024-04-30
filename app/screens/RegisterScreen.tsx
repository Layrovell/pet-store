import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { StatusBar } from 'expo-status-bar';
import colors from '../config/colors';
import { FormField, SubmitButton, Form, ErrorMessage } from '../components/forms';
import { ActivityIndicator } from '../components';
import Logo from '../components/Logo';
import useAuthService from '../services/auth/service';
import usePromiseService from '../services/promise/service';
import { AUTH_KEY } from '../store/root/config.store';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('User name'),
  firstname: Yup.string().required().label('First name'),
  lastname: Yup.string().required().label('Last name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).max(10).label('Password'),
});

function RegisterScreen() {
  const { register } = useAuthService();
  const { isLoading, error: authError } = usePromiseService();

  const loading = isLoading(AUTH_KEY);
  const error = authError(AUTH_KEY);

  const handleSubmit = async (userInfo: any) => {
    await register(userInfo);
  };

  return (
    <>
      <Screen style={styles.container}>
        <View style={styles.logo}>
          <Logo backgroundColor={colors.secondary} />
        </View>

        <Form
          initialValues={{ username: '', firstname: '', lastname: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <>
            <ErrorMessage error={error} visible={!!error} />
            <FormField icon='person' name='username' placeholder='User name' />
            <FormField icon='drive-file-rename-outline' name='firstname' placeholder='First name' />
            <FormField icon='drive-file-rename-outline' name='lastname' placeholder='Last name' />
            <FormField
              autoCapitalize='none'
              icon='email'
              keyboardType='email-address'
              name='email'
              placeholder='Email'
              textContentType='emailAddress' // iOS
            />
            <FormField
              autoCapitalize='none'
              icon='lock'
              name='password'
              placeholder='Password'
              secureTextEntry
              textContentType='password'
            />
            <SubmitButton title='Register' color='secondary' />
          </>
        </Form>
      </Screen>

      <StatusBar backgroundColor={colors.secondary} />

      <View style={{ flex: 1 }}>
        <ActivityIndicator visible={loading} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    alignItems: 'center',
    padding: 10,
  }
});

export default RegisterScreen;
