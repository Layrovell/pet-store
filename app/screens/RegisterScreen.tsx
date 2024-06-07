import React from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Formik } from 'formik';

import Screen from '../components/Screen';
import { SubmitButton } from '../components/forms';
import { ActivityIndicator } from '../components';
import useAuthService from '../controllers/auth/service';
import Stack from '../components/Stack';
import Typography from '../components/Typography';
import Link from '../components/Link';
import routes from '../navigation/routes';
import RegisterForm from '../components/molecules/form/RegisterForm';

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
  const { register, error, loading } = useAuthService();

  const handleSubmit = async (userInfo: any) => {
    await register(userInfo);
  };

  return (
    <KeyboardAvoidingView style={styles.container} contentContainerStyle={styles.content}>
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
            style={[styles.fullWidth, styles.between]}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ isValid }) => {
              return (
                <>
                  <RegisterForm formError={error.register} />

                  <Stack spacing={6} style={[styles.fullWidth, styles.right]}>
                    <Stack spacing={1} direction='row' style={styles.center}>
                      <Typography variant='body2'>Have an account?</Typography>
                      <Link text='Login' onPress={() => navigation.navigate(routes.LOGIN)} />
                    </Stack>

                    <SubmitButton disabled={!isValid} title={'Register'} />
                  </Stack>
                </>
              );
            }}
          </Formik>
        </Stack>
      </Screen>

      {loading && <ActivityIndicator visible={loading.register} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height - 80,
  },
  content: {
    flex: 1,
    flexShrink: 0,
  },
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

export default RegisterScreen;
