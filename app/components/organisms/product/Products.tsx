import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ListItem from './ProductItem';
import routes from '../../../navigation/routes';
import { ActivityIndicator } from '@components/index';
import Typography from '@components/Typography';
import { Product } from '@type/product.interface';
import { useSharedValue } from 'react-native-reanimated';

interface Props {
  navigation?: NavigationProp<ParamListBase>;
  selectedCategoryId: number;
  dataset?: Product[];
  loading: boolean;
  error: string | null;
  loadData: (v: any) => void;
  clearData: () => void;
  count: number;
}

const Products: React.FC<Props> = ({
  navigation,
  selectedCategoryId,
  dataset,
  loading,
  error,
  loadData,
  clearData,
  count,
}) => {
  const [page, setPage] = useState(1);
  const maxItemsPerPage = 10;

  useEffect(() => {
    clearData && clearData();
    setPage(1);
    loadData && loadData({ page: 1, size: maxItemsPerPage, categoryId: selectedCategoryId });
  }, [loadData, selectedCategoryId]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  const viewableItems = useSharedValue<ViewToken[]>([])

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
        viewableItems={viewableItems}
      />
    ),
    []
  );

  const loadMoreProducts = () => {
    if (page * maxItemsPerPage <= count) {
      setPage((p) => p + 1);
      loadData && loadData({ page: page + 1, size: maxItemsPerPage, categoryId: selectedCategoryId });
    }
  };

  const renderFooter = () => {
    if (page * maxItemsPerPage <= count) {
      return <ActivityIndicator visible={true} overlay={false} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && !dataset?.length && <ActivityIndicator visible={loading} />}
      {dataset?.length ? (
        <FlatList
          data={dataset}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
          columnWrapperStyle={{ gap: 16 }}
          keyExtractor={(item) => `${item.id}-${item.name}`}
          onEndReachedThreshold={0.1}
          initialNumToRender={6}
          bounces
          onEndReached={() => {
            loadMoreProducts();
          }}
          numColumns={2}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={<Typography>No data</Typography>}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems?.slice(0, 2)
          }}
        />
      ) : null}
    </View>
  );
};

export default Products;
