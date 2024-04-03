import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Screen from '../components/Screen';

function RegisterScreen() {
  const handleSubmit = async (userInfo: any) => {
    console.log('RegisterScreen');
  };

  return (
    <Screen style={styles.container}>
      <Text>RegisterScreen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
