import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Screen from '../components/Screen';

const LoginScreen: React.FC = () => {
  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    console.log('LoginScreen');
  };

  return (
    <Screen style={styles.container}>
      <Text>LoginScreen</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default LoginScreen;
