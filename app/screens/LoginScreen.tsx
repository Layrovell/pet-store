import React from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Formik } from 'formik';

import Screen from '../components/Screen';
import { FormField, SubmitButton, ErrorMessage } from '../components/forms';
import { ActivityIndicator } from '../components';
import useAuthService from '../services/auth/service';
import Stack from '../components/Stack';
import colors from '../config/colors';
import { AUTH_KEY } from '../store/root/config.store';
import usePromiseService from '../services/promise/service';
import Typography from '../components/Typography';
import Link from '../components/Link';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuthService();
  const { getIsLoading, getError } = usePromiseService();

  const loading = getIsLoading(AUTH_KEY);
  const error = getError(AUTH_KEY);

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, minHeight: Dimensions.get('window').height - 80 }}
      contentContainerStyle={{ flex: 1, flexShrink: 0 }}
    >
      <Screen>
        <Stack spacing={6} style={{ flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant='h1'>Hello</Typography>
            <Typography variant='h1'>Welcome Back!</Typography>
          </Stack>
          <Typography variant='body2'>
            Water is life. Water is a basic human need. In various lines of life, humans need water.
          </Typography>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            {({ isValid }) => {
              return (
                <>
                  <Stack spacing={4} style={{ marginBottom: 36 }}>
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
                  </Stack>

                  <Stack spacing={6} style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Stack spacing={1} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <Typography variant='body2'>Don’t have an account?</Typography>
                      <Link
                        variant={'h5'}
                        color={colors.secondary.main}
                        onPress={() => navigation.navigate(routes.REGISTER)}
                        text='Create Account'
                      />
                    </Stack>

                    <SubmitButton title={'Login'} disabled={!isValid} color={colors.secondary.main} />
                  </Stack>
                </>
              );
            }}
          </Formik>
        </Stack>
      </Screen>

      {loading && <ActivityIndicator visible={loading} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
