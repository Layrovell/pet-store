import { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';

import Screen from '@components/Screen';
import Link from '@components/Link';
import ActionBar from '@components/ActionBar';
import Products from '@organisms/product/Products';
import HorizontalNav from '@components/navigation/HorizontalNav';
import useProductsService from '../controllers/product/service';
import useCategoriesService from '../controllers/category/service';
import Input from '@components/atoms/Input';
import Icon from '@components/atoms/Icon';
import Stack from '@components/Stack';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(4);

  const {
    data: products,
    error: errorProducts,
    loading: isLoadingProducts,
    loadProductsByCategoryId,
  } = useProductsService();

  const { loadCategories, data: categories } = useCategoriesService();

  useEffect(() => {
    const params = { page: 1, size: 20 };
    loadCategories(params);
  }, [loadCategories]);

  useEffect(() => {
    const params = { page: 1, size: 20, categoryId: selectedCategoryId };
    loadProductsByCategoryId(params);
  }, [loadProductsByCategoryId, selectedCategoryId]);

  return (
    <Screen>
      <Input placeholder='Search Product' accessoryLeft={<Icon name='search-outline' />} />

      <Stack spacing={4}>
        <HorizontalNav menuItems={categories?.content.filter((el) => el.parentId)} onSelect={setSelectedCategoryId} />

        <ActionBar title='Recommended for You'>
          <Link text='See more' variant='body1' onPress={() => {}} />
        </ActionBar>

        <View>
          <Products
            dataset={products?.content}
            isLoading={isLoadingProducts}
            error={errorProducts}
            navigation={navigation}
          />
        </View>
      </Stack>
    </Screen>
  );
};

export default HomeScreen;
