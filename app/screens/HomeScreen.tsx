import { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '@components/Screen';
import Link from '@components/Link';
import ActionBar from '@components/ActionBar';
import Products from '@organisms/product/Products';
import HorizontalNav from '@components/navigation/HorizontalNav';
import useCategoriesService from '../controllers/category/service';
import useProductsService from 'controllers/product/service';
import Input from '@components/atoms/Input';
import Icon from '@components/atoms/Icon';
import Stack from '@components/Stack';
import routes from 'navigation/routes';
import { ActivityIndicator } from '@components/index';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1);

  const { loadCategories, data: categories } = useCategoriesService();
  const {
    products: productsByCategory,
    count,
    error: errorProductsByCategory,
    loading: loadingProductsByCategory,
    loadProductsByCategoryId,
    clearProducts,
    maxItemsPerPage,
  } = useProductsService();

  const [selectedCategoryId, setSelectedCategoryId] = useState(4);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    clearProducts();
    setPage(1);

    loadProductsByCategoryId({ page: 1, size: maxItemsPerPage, categoryId: selectedCategoryId });
  }, [loadProductsByCategoryId, selectedCategoryId]);

  const loadMoreProducts = () => {
    if (page * maxItemsPerPage <= count) {
      setPage((p) => p + 1);
      loadProductsByCategoryId({ page: page + 1, size: maxItemsPerPage, categoryId: selectedCategoryId });
    }
  };

  const renderFooter = () => {
    if (page * maxItemsPerPage <= count) {
      return <ActivityIndicator visible={true} overlay={false} />;
    }
  };

  return (
    <Screen>
      <Input placeholder='Search Product' accessoryLeft={<Icon name='search-outline' />} />

      <Stack spacing={4} style={{ flex: 1 }}>
        <HorizontalNav
          menuItems={categories?.content.filter((el) => el.parentId)}
          onSelect={setSelectedCategoryId}
          selectedItemId={selectedCategoryId}
        />

        <ActionBar title='Recommended for You'>
          <Link
            text='See more'
            variant='body1'
            onPress={() => {
              navigation.navigate(routes.PRODUCTS, { categoryId: selectedCategoryId });
            }}
          />
        </ActionBar>

        <Products
          navigation={navigation}
          dataset={productsByCategory}
          loading={loadingProductsByCategory}
          error={errorProductsByCategory}
          loadMoreProducts={loadMoreProducts}
          renderFooter={renderFooter}
        />
      </Stack>
    </Screen>
  );
};

export default HomeScreen;
