import React, { useCallback } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ListItem from './ProductItem';
import routes from '../../../navigation/routes';
import { ActivityIndicator } from '@components/index';
import Typography from '@components/Typography';
import { Product } from '@type/product.interface';
import { useSharedValue } from 'react-native-reanimated';
import useProductFiltration from 'hooks/useProductFiltration';

interface Props {
  navigation?: NavigationProp<ParamListBase>;
  dataset?: Product[];
  loading: boolean;
  error: string | null;
  loadMoreProducts: (v?: any) => void;
  renderFooter?: any;
}

const ProductListWithFilters: React.FC<Props> = ({ navigation, dataset, loading, error, loadMoreProducts, renderFooter }) => {
  const { filterOptions } = useProductFiltration();

  if (error) {
    return <Typography>{error}</Typography>;
  }

  const viewableItems = useSharedValue<ViewToken[]>([]);

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

  return (
    <View style={{ flex: 1 }}>
      {loading && !dataset?.length && <ActivityIndicator visible={loading} />}
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
          loadMoreProducts(filterOptions);
        }}
        numColumns={2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && !dataset?.length ? (
            <View style={{ flex: 1 }}>
              <Typography>No data</Typography>
            </View>
          ) : null
        }
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
      />
    </View>
  );
};

export default ProductListWithFilters;
