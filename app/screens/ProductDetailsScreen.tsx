import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppButton from '../components/Button';
import Typography from '../components/Typography';
import Stack from '../components/Stack';
import ImageCarousel from '../components/ImageCarousel';
import Attributes from '../components/Attributes';
import PlusMinusButton from '../components/PlusMinusButton';
import Footer from '../components/Footer';
import { getRandomImages } from '../api/mock/products';
import { firstUpperLetter } from 'utils/stringFormatter';
import useCategoriesService from 'controllers/category/service';

interface Props {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [amount, setAmount] = useState(0);

  const { categoryById, loadCategoryById } = useCategoriesService();

  const item = route.params;

  const imagesMock = useMemo(() => {
    return getRandomImages();
  }, []);

  useEffect(() => {
    if (item?.categoryId) {
      loadCategoryById(item.categoryId);
    }
  }, [item?.categoryId]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: firstUpperLetter(item.name) })
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageCarousel items={imagesMock} />

        <Screen style={{ minHeight: 300, marginTop: 24 }}>
          <Stack spacing={4}>
            <Typography variant='h5' style={{ textTransform: 'capitalize' }}>
              {item.name}
            </Typography>
            <Typography variant='body2'>Category: {categoryById?.name || 'no category'}</Typography>
            <Typography variant='body3'>{item?.description}</Typography>

            <Attributes data={item.productAttributeNames} />
          </Stack>
        </Screen>
      </ScrollView>

      <Footer>
        <View style={styles.horizontal}>
          <PlusMinusButton value={amount} setValue={setAmount} />

          <Typography variant='h2'>${item.price}</Typography>
        </View>

        <AppButton
          title='Add to Cart'
          size='lg'
          radius={30}
          fullWidth
          onPress={() => {
            navigation.navigate(routes.CART_DETAILS);
          }}
        />
      </Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default ProductDetailsScreen;
