import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ListItem from './ProductItem';
import routes from '../../../navigation/routes';
import { ActivityIndicator } from '@components/index';
import Typography from '@components/Typography';
import { Product } from '@type/product.interface';
import useProductsService from 'controllers/product/service';

interface Props {
  navigation?: NavigationProp<ParamListBase>;
  selectedCategoryId: number;
}

const Products: React.FC<Props> = ({ navigation, selectedCategoryId }) => {
  const [page, setPage] = useState(1);
  const maxItemsPerPage = 10;

  const { products, count, error, loading, loadProductsByCategoryId, clearProducts } = useProductsService();

  console.log('products:', products);

  useEffect(() => {
    clearProducts();
    setPage(1);
    loadProductsByCategoryId({ page: 1, size: maxItemsPerPage, categoryId: selectedCategoryId });
  }, [loadProductsByCategoryId, selectedCategoryId]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!loading && !products?.length) {
    return <Typography>No data</Typography>;
  }

  const renderItem = useCallback(
    ({ item }: any) => (
      <ListItem
        onPress={() => {
          navigation?.navigate(routes.PRODUCT_DETAILS, item);
        }}
        onPressBuy={() => {
          navigation?.navigate(routes.CART_DETAILS);
        }}
        item={item}
      />
    ),
    []
  );

  const loadMoreProducts = () => {
    if (page * maxItemsPerPage <= count) {
      setPage((p) => p + 1);
      setTimeout(() => {
        loadProductsByCategoryId({ page: page + 1, size: maxItemsPerPage, categoryId: selectedCategoryId });
      }, 1000);
    }
  };

  const renderFooter = () => {
    if (page * maxItemsPerPage <= count) {
      return <ActivityIndicator visible={true} overlay={false} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && !products?.length && <ActivityIndicator visible={loading} />}
      {products?.length ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
          columnWrapperStyle={{ gap: 16 }}
          keyExtractor={(item) => `${item.id}-${item.name}`}
          onEndReachedThreshold={0.1}
          // ListFooterComponent={renderLoader}
          // debug
          // removeClippedSubviews={true}
          initialNumToRender={maxItemsPerPage}
          onEndReached={({ distanceFromEnd }) => {
            console.log('distanceFromEnd:', distanceFromEnd);
            loadMoreProducts();
          }}
          numColumns={2}
          ListFooterComponent={renderFooter}
        />
      ) : null}
    </View>
  );
};

export default Products;
