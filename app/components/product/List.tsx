import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ListItem from './ListItem';
import routes from '../../navigation/routes';

interface Props {
  dataset: any[];
  title: string;
  navigation: NavigationProp<ParamListBase>;
}

const numColumns = 2;
const gap = 16;

const List: React.FC<Props> = ({ dataset, title, navigation }) => {
  function renderMealItem(itemData: any) {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      name: item.name,
      photoUrls: item.photoUrls,
      status: item.status || 'unknown',
      category: item.category.name || 'unknown',
      price: '$99.00',
    };
    return (
      <ListItem
        {...mealItemProps}
        onPress={() => {
          navigation.navigate(routes.PRODUCT_DETAILS, mealItemProps);
        }}
        onPressBuy={() => {
          navigation.navigate(routes.CART_DETAILS);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.listContainer}>
        <FlatList
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          data={dataset}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderMealItem}
          contentContainerStyle={{ gap }}
          columnWrapperStyle={{ gap: 24 }}
          ItemSeparatorComponent={() => <View style={{ width: 16, backgroundColor: 'pink' }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default List;
