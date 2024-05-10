import React from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Formik } from 'formik';

import Screen from '../components/Screen';
import colors from '../config/colors';
import { FormField, SubmitButton, Form, ErrorMessage } from '../components/forms';
import { ActivityIndicator } from '../components';
import useAuthService from '../controllers/auth/service';
import usePromiseService from '../controllers/promises/service';
import { AUTH_KEY } from '../store/config.store';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import Link from '../components/Link';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('User name'),
  firstname: Yup.string().required().label('First name'),
  lastname: Yup.string().required().label('Last name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).max(10).label('Password'),
});

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuthService();
  const { getIsLoading, getError } = usePromiseService();

  const loading = getIsLoading(AUTH_KEY);
  const error = getError(AUTH_KEY);

  const handleSubmit = async (userInfo: any) => {
    await register(userInfo);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, minHeight: Dimensions.get('window').height - 80 }}
      contentContainerStyle={{ flex: 1, flexShrink: 0 }}
    >
      <Screen>
        <Stack spacing={6} style={{ flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant='h1'>Create</Typography>
            <Typography variant='h1'>New Account</Typography>
          </Stack>
          <Typography variant='body2'>
            Water is life. Water is a basic human need. In various lines of life, humans need water.
          </Typography>

          <Formik
            initialValues={{ username: '', firstname: '', lastname: '', email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            {({ isValid }) => {
              return (
                <>
                  <Stack spacing={4} style={{ marginBottom: 36 }}>
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
                  </Stack>

                  <Stack spacing={6} style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Stack spacing={1} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <Typography variant='body2'>Have an account?</Typography>
                      <Link
                        variant={'button'}
                        color={colors.secondary.main}
                        onPress={() => navigation.navigate(routes.LOGIN)}
                        text='Login'
                      />
                    </Stack>

                    <SubmitButton disabled={!isValid} title={'Register'} color={colors.secondary.main} />
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

export default RegisterScreen;
