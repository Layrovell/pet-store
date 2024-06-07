import { Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import LottieView from 'lottie-react-native';

import { RootStackParamList } from '@type/navigation';
import Button from '@components/atoms/Button';
import Screen from '@components/Screen';
import Stack from '@components/Stack';

type Props = StackScreenProps<RootStackParamList, 'ErrorPage'>;

const ErrorScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <Stack spacing={4}>
        <Text>An unexpected error occurred.</Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </Stack>

      <LottieView
        source={require('../assets/animations/API_error.json')}
        style={{ width: 260, height: 260 }}
        autoPlay
        loop
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorScreen;
