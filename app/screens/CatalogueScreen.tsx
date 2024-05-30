import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Stack from '@components/Stack';
import Icon from '@components/atoms/Icon';
import Typography from '@components/Typography';
import useCategoriesService from 'controllers/category/service';
import { firstUpperLetter } from 'utils/stringFormatter';
import { getMenuIcon } from 'config/UI/CustomIcons';
import routes from 'navigation/routes';
import colors from 'config/colors';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

// if ID -> id
// else ALL

const CatalogueScreen: React.FC<Props> = ({ navigation }) => {
  const { loadCategories, data: categories } = useCategoriesService();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  console.log('categories:', categories);

  const categoriesMenu = useMemo(() => categories?.content.filter((el) => el.parentId), [categories?.content.length]);

  return (
    <Stack>
      <FlatList
        data={categoriesMenu}
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
