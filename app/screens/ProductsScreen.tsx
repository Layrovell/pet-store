import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { DrawerLayout, DrawerPosition, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@type/navigation';

import useProductsService from 'controllers/product/service';
import useCategoriesService from 'controllers/category/service';
import ProductsFilters from '@organisms/product/ProductsFilters';
import useProductFiltration from 'hooks/useProductFiltration';
import { ActivityIndicator } from '@components/index';
import ProductListWithFilters from '@organisms/product/ProductListWithFilters';
import Stack from '@components/Stack';
import colors from 'config/colors';
import Icon from '@atoms/Icon';
import Card from '@atoms/Card';
import { firstUpperLetter } from 'utils/stringFormatter';

type Props = StackScreenProps<RootStackParamList, 'Products'>;

const ProductsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  const drawerRef = useRef<DrawerLayout>(null);
  const categoryIdParam = route.params.categoryId;

  const { loadAttributesByCategory, attributes, loading, loadCategoryById, categoryById } = useCategoriesService();
  const {
    products: productsByCategory,
    count: productsCountByCategory,
    error: errorProductsByCategory,
    loading: loadingProductsByCategory,
    loadProductsByCategoryId,
    clearProducts,
    maxItemsPerPage,
  } = useProductsService();
  const { filterOptions, updateSortOptions, sortOptions } = useProductFiltration();

  useEffect(() => {
    loadCategoryById(categoryIdParam);
  }, [loadCategoryById]);

  useLayoutEffect(() => {
    if (categoryById && !loading.categoryById) {
      const title = firstUpperLetter(categoryById.name);
      navigation.setOptions({ title });
    }

    return () => {
      // check on physical device if title flickers from previous to the new one
      navigation.setOptions({ title: '' });
    };
  }, [navigation, categoryById]);

  useEffect(() => {
    if (categoryIdParam) {
      loadAttributesByCategory(categoryIdParam);
    }
  }, [loadAttributesByCategory, categoryIdParam]);

  const initialLoadProducts = useCallback(() => {
    clearProducts();
    setPage(1);

    loadProductsByCategoryId({ page: 1, size: maxItemsPerPage, categoryId: categoryIdParam });
  }, []);

  useEffect(() => {
    initialLoadProducts();
  }, [loadProductsByCategoryId, categoryIdParam]);

  const closeDrawer = useCallback(() => {
    drawerRef.current?.closeDrawer();
  }, []);

  const openDrawer = useCallback(() => {
    drawerRef.current?.openDrawer();
  }, []);

  const toggleDrawer = useCallback(() => {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  const toggleSortFilter = () => {
    setPage(1);
    updateSortOptions('price', !sortOptions?.desc);
    // fetchWithFilters();
  };

  useEffect(() => {
    if (filterOptions.length || sortOptions) {
      page === 1 && clearProducts();
      const filters = filterOptions.length ? filterOptions : undefined;
      loadProductsByCategoryId({
        page: page,
        size: maxItemsPerPage,
        categoryId: categoryIdParam,
        filters,
        sort_by: sortOptions,
      });
    }
  }, [filterOptions, sortOptions, loadProductsByCategoryId, clearProducts, page]);

  const loadMoreProducts = () => {
    if (page * maxItemsPerPage <= productsCountByCategory) {
      setPage((p) => p + 1);
    }
  };

  const renderFooter = () => {
    if (page * maxItemsPerPage <= productsCountByCategory) {
      return <ActivityIndicator visible={true} overlay={false} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack direction='row' style={styles.actionBar}>
        <TouchableWithoutFeedback onPress={toggleSortFilter} style={[styles.button, styles.line]}>
          <Card style={styles.card}>
            <Stack spacing={1} style={styles.content}>
              <Text>Sort</Text>
              <Icon name={sortOptions?.desc ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} />
            </Stack>
          </Card>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={toggleDrawer}>
          <Card style={[styles.card]}>
            <Stack style={styles.content}>
              <Text>Filter</Text>
            </Stack>
          </Card>
        </TouchableWithoutFeedback>
      </Stack>

      <DrawerLayout
        ref={drawerRef}
        drawerWidth={Dimensions.get('screen').width - 120}
        drawerPosition={DrawerLayout.positions.Right as DrawerPosition}
        drawerType='front'
        drawerBackgroundColor='#fff'
        enableTrackpadTwoFingerGesture={true}
        renderNavigationView={() => {
          return (
            <ProductsFilters
              data={attributes}
              isLoading={loading.attributes}
              // fetchWithFilters={fetchWithFilters}
              initialLoadProducts={initialLoadProducts}
            />
          );
        }}
        onDrawerClose={() => setIsDrawerOpen(false)}
        onDrawerOpen={() => setIsDrawerOpen(true)}
      >
        <View style={{ margin: 16, flex: 1 }}>
          <ProductListWithFilters
            navigation={navigation}
            dataset={productsByCategory}
            loading={loadingProductsByCategory}
            error={errorProductsByCategory}
            loadMoreProducts={loadMoreProducts}
            renderFooter={renderFooter}
          />
        </View>
      </DrawerLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    minWidth: '50%',
  },
  card: {
    borderColor: 'transparent',
  },
  line: {
    borderRightWidth: 1,
    borderRightColor: colors.grey[10],
  },
  content: {
    flexDirection: 'row', justifyContent: 'center',
  },
  actionBar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[10],
    borderTopColor: colors.grey[10],
  },
});

export default ProductsScreen;
