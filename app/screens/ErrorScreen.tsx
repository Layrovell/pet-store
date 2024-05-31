import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {}

const ErrorScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>ErrorScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ErrorScreen;
