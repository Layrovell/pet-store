import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Stack from '@components/Stack';
import Icon from '@components/atoms/Icon';
import Typography from '@components/Typography';
import useCategoriesService from 'controllers/category/service';
import { firstUpperLetter } from 'utils/stringFormatter';
import { getMenuIcon } from 'config/UI/CustomIcons';
import routes from 'navigation/routes';
import colors from 'config/colors';
import { CategoryType } from '@type/category';

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const CatalogueScreen: React.FC<Props> = ({ navigation, route }) => {
  const { loadCategories, data: categories } = useCategoriesService();

  const [menuItems, setMenuItems] = useState<CategoryType[]>([]);

  const parentIdParam = route?.params?.categoryId;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    let menu = [];

    if (parentIdParam) {
      menu = categories?.content.filter((c) => c.parentId === parentIdParam);
    } else {
      // display all subcategories
      menu = categories?.content.filter((c) => c.parentId);
    }

    if (menu.length > 0) {
      setMenuItems(menu);
    }
  }, [parentIdParam]);

  return (
    <Stack>
      <FlatList
        data={menuItems}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate(routes.PRODUCTS, { categoryId: item.id })}
            >
              <Stack spacing={2} direction='row' style={styles.row}>
                <Stack spacing={4} direction='row'>
                  <View style={styles.icon}>{getMenuIcon(item.id)}</View>
                  <Typography>{firstUpperLetter(item.name)}</Typography>
                </Stack>
                <Icon name='arrow-ios-forward-outline' />
              </Stack>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    padding: 16,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.grey[10],
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CatalogueScreen;
