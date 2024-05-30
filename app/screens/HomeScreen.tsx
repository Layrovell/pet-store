import { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '@components/Screen';
import Link from '@components/Link';
import ActionBar from '@components/ActionBar';
// import Products from '@organisms/product/Products';
import HorizontalNav from '@components/navigation/HorizontalNav';
import useCategoriesService from '../controllers/category/service';
import useProductsService from 'controllers/product/service';
import Input from '@components/atoms/Input';
import Icon from '@components/atoms/Icon';
import Stack from '@components/Stack';
import routes from 'navigation/routes';
import { ActivityIndicator } from '@components/index';
import ProductsList from '@components/organisms/product/ProductsList';
import Button from '@atoms/Button';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1);

  const { loadCategories, data: categories } = useCategoriesService();
  const {
    products,
    count,
    error: errorProduct,
    loading: loadingProducts,
    loadProducts,
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

    loadProducts({ page: 1, size: maxItemsPerPage });
  }, [loadProducts]);

  const loadMoreProducts = () => {
    if (page * maxItemsPerPage <= count) {
      setPage((p) => p + 1);
      loadProducts({ page: page + 1, size: maxItemsPerPage });
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
          menuItems={categories?.content}
          onSelect={setSelectedCategoryId}
          selectedItemId={selectedCategoryId}
        />

        <Button onPress={() => navigation?.navigate(routes.CATALOGUE)}>Catalogue</Button>

        <ActionBar title='New arrivals' />
          {/* <Link
            text='See more'
            variant='body1'
            onPress={() => {
              navigation.navigate(routes.PRODUCTS, { categoryId: selectedCategoryId });
            }}
          /> */}
        {/* </ActionBar> */}

        <ProductsList
          navigation={navigation}
          dataset={products}
          loading={loadingProducts}
          error={errorProduct}
          loadMoreProducts={loadMoreProducts}
          renderFooter={renderFooter}
        />
      </Stack>
    </Screen>
  );
};

export default HomeScreen;
