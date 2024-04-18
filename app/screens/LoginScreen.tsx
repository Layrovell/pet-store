import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { FormField, SubmitButton, Form, ErrorMessage } from '../components/forms';
import { ActivityIndicator } from '../components';
import Logo from '../components/Logo';
import useAuthService from '../services/auth/service';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('User name'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen: React.FC = () => {
  const { login, error, loading } = useAuthService();

  const handleSubmit = async ({ username, password }: { username: string; password: string }) => {
    await login(username, password);
  };

  return (
    <>
      <Screen style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>

        <Form
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <>
            <ErrorMessage error={error} visible={!!error} />
            <FormField
              name='username'
              icon={'person'}
              placeholder={'User name'}
              autoCapitalize='none'
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
