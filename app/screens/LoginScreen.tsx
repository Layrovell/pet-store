import React from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Formik } from 'formik';

import Screen from '../components/Screen';
import { ErrorMessage, SubmitButton } from '../components/forms';
import { ActivityIndicator } from '../components';
import useAuthService from '../controllers/auth/service';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import Link from '../components/Link';
import routes from '../navigation/routes';
import LoginForm from '../components/molecules/form/LoginForm';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, error, loading } = useAuthService();

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.fullWidth, { minHeight: Dimensions.get('window').height - 80 }]}
      contentContainerStyle={[styles.fullWidth, { flexShrink: 0 }]}
    >
      <Screen>
        <Stack spacing={6} style={styles.fullWidth}>
          <Stack spacing={2}>
            <Typography variant='h1'>Hello</Typography>
            <Typography variant='h1'>Welcome Back!</Typography>
          </Stack>
          <Typography variant='body2'>
            Water is life. Water is a basic human need. In various lines of life, humans need water.
          </Typography>

          <Formik
            initialValues={{ email: 'qqq@gmail.com', password: 'qwe123' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnBlur={false}
          >
            {({ isValid, dirty }) => {
              return (
                <>
                  <LoginForm formError={error.login} />

                  <Stack spacing={6} style={[styles.fullWidth, styles.right]}>
                    <Stack spacing={1} direction='row' style={styles.center}>
                      <Typography variant='body2'>Don’t have an account?</Typography>
                      <Link text='Create Account' onPress={() => navigation.navigate(routes.REGISTER)} />
                    </Stack>

                    <SubmitButton title={'Login'} disabled={!isValid} />
                  </Stack>
                </>
              );
            }}
          </Formik>
        </Stack>

        <ErrorMessage error={error.login} />
      </Screen>

      {loading && <ActivityIndicator visible={loading.login} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
  },
  right: {
    justifyContent: 'flex-end',
  },
  between: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
});

export default LoginScreen;
