import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import Screen from '../components/Screen';

const DummyScreen: React.FC = () => {
  return (
    <Screen style={styles.screen}>
      <Text>DummyScreen</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 20,
    flex: 1,
  },
});

export default DummyScreen;
