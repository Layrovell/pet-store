import { Button, StyleSheet, Text } from 'react-native';
import colors from '../config/colors';
import Screen from '../components/Screen';
import useAuthService from '../services/auth/service';

const DummyScreen: React.FC = () => {
  const { logout } = useAuthService();

  const deleteToken = async () => {
    logout();
  };

  return (
    <Screen style={styles.screen}>
      <Text>DummyScreen</Text>
      <Button title='Logout' onPress={deleteToken} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 20,
    marginVertical: 30,
    flex: 1,
    gap: 16,
  },
});

export default DummyScreen;
