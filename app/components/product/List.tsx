import React from 'react';
import { FlatList } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ListItem from './ListItem';
import routes from '../../navigation/routes';

interface Props {
  dataset: any[];
  navigation: NavigationProp<ParamListBase>;
}

const numColumns = 2;
const gap = 16;

const List: React.FC<Props> = ({ dataset, navigation }) => {
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

export default List;
