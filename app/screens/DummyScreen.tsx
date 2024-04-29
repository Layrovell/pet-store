import { useEffect } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import colors from '../config/colors';
import Screen from '../components/Screen';
import useAuthService from '../services/auth/service';
import List from '../components/product/List';
import useProductsService from '../services/product/service';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const DummyScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuthService();
  const { getProducts, products } = useProductsService();

  useEffect(() => {
    getProducts(['available', 'sold', 'pending'])
  }, []);

  const deleteToken = async () => {
    logout();
  };

  return (
    <Screen style={styles.screen}>
      <Button title='Logout' onPress={deleteToken} />
      {products.length ? <List dataset={products} title='Pets' navigation={navigation} /> : <></>}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default DummyScreen;
