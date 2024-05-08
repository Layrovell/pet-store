import { useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

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
    getProducts(['available', 'sold', 'pending']);
  }, []);

  return (
    <Screen>
      {products.length ? <List dataset={products} navigation={navigation} /> : <></>}
    </Screen>
  );
};

export default DummyScreen;
