import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { FormField, SubmitButton, Form, ErrorMessage } from '../components/forms';
import { ActivityIndicator } from '../components';
import Logo from '../components/Logo';
import useAuthService from '../services/auth/service';
import { AUTH_KEY } from '../store/root/config.store';
import { useDispatch, useStore } from 'react-redux';
import { useAppSelector } from '../store/root/hooks';
import { getSelectApiData, promiseActions } from '../store/promises/slice';
import usePromiseService from '../services/promise/service';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen: React.FC = () => {
  const { login } = useAuthService();
  const { data, getIsLoading, getError } = usePromiseService();

  // const { getState } = useStore();
  // const dispatch = useDispatch();

  // const promiseData = useAppSelector(getSelectApiData('authApi'))

  const loading = getIsLoading(AUTH_KEY);
  const error = getError(AUTH_KEY);

  const { getState, subscribe } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscr = subscribe(() => {
      console.log('=====getState', getState());
    });
    return () => unsubscr();
  }, []);

  const promiseData = useAppSelector(getSelectApiData('authApi'));

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
  };

  return (
    <>
      <Screen style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>

        <Form initialValues={{ email: 'eee@gmail.com', password: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <>
            <ErrorMessage error={false} visible={false} />
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

            {/* <Button
              title='btn 1'
              onPress={() => {
                dispatch(promiseActions.promisePending('authApi'));
                console.log('=====getState', getState());
                const delay = new Promise((resolve) => setTimeout(resolve, 3000, 'hello'));
                dispatch(promiseActions.promiseAsync('testApi', delay));
              }}
            />
            <Button
              title='btn 2'
              onPress={() => {
                dispatch(promiseActions.promiseResolved('authApi', { say: 'hello' }));
                console.log('=====getState', getState());
              }}
            /> */}
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
