import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Screen from '../components/Screen';

interface Props {}

const AccountScreen: React.FC<Props> = () => {
  return (
    <Screen style={styles.screen}>
      <Text>AccountScreen</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AccountScreen;
