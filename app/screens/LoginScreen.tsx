import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { FormField, SubmitButton, Form, ErrorMessage } from '../components/forms';
import { ActivityIndicator } from '../components';
import Logo from '../components/Logo';
import useAuthService from '../services/auth/service';
import { AUTH_KEY } from '../store/root/config.store';
import usePromiseService from '../services/promise/service';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen: React.FC = () => {
  const { login } = useAuthService();
  const { data, getIsLoading, getError } = usePromiseService();

  const loading = getIsLoading(AUTH_KEY);
  const error = getError(AUTH_KEY);

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
  };

  return (
    <>
      <Screen style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>

        <Form initialValues={{ email: '', password: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <>
            <ErrorMessage error={error} visible={!!error} />
            <FormField
              name='email'
              icon={'email'}
              placeholder={'Email'}
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress' // iOS
              // onChangeText={handleChange("email")}
              // onBlur={() => setFieldTouched('email')}
            />
            <FormField
              name='password'
              icon={'lock'}
              hideIcon={'lock-open'}
              placeholder={'Password'}
              autoCapitalize='none'
              textContentType='password' // iOS
              secureTextEntry
            />
            <SubmitButton title={'Login'} />
          </>
        </Form>
      </Screen>

      <View style={{ flex: 1 }}>
        <ActivityIndicator visible={loading} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    alignItems: 'center',
    padding: 10,
  },
});

export default LoginScreen;
