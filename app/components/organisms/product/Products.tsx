import React from 'react';
import { FlatList } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ListItem from './ProductItem';
import routes from '../../../navigation/routes';
import { ActivityIndicator } from '@components/index';
import Typography from '@components/Typography';
import { Product } from '@type/product.interface';

interface Props {
  dataset?: Product[];
  navigation: NavigationProp<ParamListBase>;
  isLoading: boolean;
  error?: string | null;
}

const numColumns = 2;
const gap = 16;

const Products: React.FC<Props> = ({ dataset, navigation, isLoading, error }) => {
  if (isLoading) {
    return (
      <ActivityIndicator visible={isLoading} />
    )
  }
  
  function renderMealItem(itemData: any) {
    const item = itemData.item;

    return (
      <ListItem
        item={item}
        onPress={() => {
          navigation.navigate(routes.PRODUCT_DETAILS, item);
        }}
        onPressBuy={() => {
          navigation.navigate(routes.CART_DETAILS);
        }}
      />
    )
  }

  if (error) {
    return <Typography>{error}</Typography>
  }

  if (!isLoading && !dataset?.length) {
    return <Typography>No data</Typography>
  }

  return (
    <FlatList
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      data={dataset}
      keyExtractor={(item, idx) => `${item.id}-${idx}`}
      renderItem={renderMealItem}
      contentContainerStyle={{ gap }}
      columnWrapperStyle={{ gap }}
    />
  );
};

export default Products;
