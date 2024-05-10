import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import Typography from '../components/Typography';
import colors from '../config/colors';
import useAuthService from '../controllers/auth/service';
import Stack from '../components/Stack';
import { FormField, SubmitButton } from '../components/forms';

const validationSchema = Yup.object().shape({
  username: Yup.string().label('User name'),
  firstname: Yup.string().label('First name'),
  lastname: Yup.string().label('Last name'),
});

interface Props {}

const AccountScreen: React.FC<Props> = () => {
  const { data: user } = useAuthService();

  const handleSubmit = async (data: any) => {
    console.log('handleSubmit');
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.backgroundImage}>
          <View style={styles.userImageContainer}></View>
        </View>

        <View style={{ marginTop: 60 }}>
          <Typography variant='h4' textAlign='center'>
            {user.username}
          </Typography>
        </View>

        <Stack spacing={2} style={{ marginTop: 26 }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            {({ isValid }) => {
              return (
                <Stack spacing={4} style={{ marginBottom: 36 }}>
                  <Stack spacing={2}>
                    <Typography>First name</Typography>
                    <FormField name='username' placeholder='User name' />
                  </Stack>

                  <Stack spacing={2}>
                    <Typography>First name</Typography>
                    <FormField name='firstname' placeholder='First name' />
                  </Stack>

                  <Stack spacing={2}>
                    <Typography>First name</Typography>
                    <FormField name='lastname' placeholder='Last name' />
                  </Stack>

                  <SubmitButton title={'Save changes'} disabled={!isValid} color={colors.secondary.main} />
                </Stack>
              );
            }}
          </Formik>
        </Stack>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 160,
    width: '100%',
    backgroundColor: colors.grey[10],
    borderRadius: 26,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  userImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.secondary.main,
    borderRadius: 50,
    position: 'absolute',
    bottom: -50,
  },
});

export default AccountScreen;
