import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { DrawerLayout, DrawerPosition, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import useProductsService from 'controllers/product/service';
import useCategoriesService from 'controllers/category/service';
import ProductsFilters from '@organisms/product/ProductsFilters';
import useProductFiltration from 'hooks/useProductFiltration';
import { ActivityIndicator } from '@components/index';
import Products from '@organisms/product/Products';
import Stack from '@components/Stack';
import colors from 'config/colors';
import Icon from '@atoms/Icon';
import Card from '@atoms/Card';

interface Props {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const ProductsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPriceDescOrder, setIsPriceDescOrder] = useState(false);
  const [page, setPage] = useState(1);

  const drawerRef = useRef<DrawerLayout>(null);
  const categoryIdParam = route.params.categoryId;

  const { loadAttributesByCategory, attributes, loading: isLoadingAttrs } = useCategoriesService();
  const {
    products: productsByCategory,
    count: productsCountByCategory,
    error: errorProductsByCategory,
    loading: loadingProductsByCategory,
    loadProductsByCategoryId,
    clearProducts,
    maxItemsPerPage,
  } = useProductsService();
  const { filterOptions } = useProductFiltration();

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
    setIsPriceDescOrder((prev) => !prev);
  };

  const fetchWithFilters = (options: any) => {
    if (options?.length) {
      clearProducts();
      loadProductsByCategoryId({ page: 1, size: maxItemsPerPage, categoryId: categoryIdParam, filters: options });
    }
    closeDrawer();
  }

  const loadMoreProducts = useCallback(() => {
    if (page * maxItemsPerPage <= productsCountByCategory) {
      setPage((p) => p + 1);
      loadProductsByCategoryId({ page: page + 1, size: maxItemsPerPage, categoryId: categoryIdParam, filters: filterOptions });
    }
  }, [filterOptions.length, productsCountByCategory, page]);

  const renderFooter = () => {
    if (page * maxItemsPerPage <= productsCountByCategory) {
      return <ActivityIndicator visible={true} overlay={false} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        direction='row'
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderBottomColor: colors.grey[10],
          borderTopColor: colors.grey[10],
        }}
      >
        <TouchableWithoutFeedback
          onPress={toggleSortFilter}
          style={[styles.button, { borderRightWidth: 1, borderRightColor: colors.grey[10] }]}
        >
          <Card style={{ borderColor: 'transparent' }}>
            <Stack spacing={1} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text>Sort</Text>
              <Icon name={isPriceDescOrder ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} />
            </Stack>
          </Card>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={toggleDrawer}>
          <Card style={{ borderColor: 'transparent' }}>
            <Stack style={{ alignItems: 'center' }}>
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
              isLoading={isLoadingAttrs.attributes}
              fetchWithFilters={fetchWithFilters}
              initialLoadProducts={initialLoadProducts}
            />
          );
        }}
        onDrawerClose={() => setIsDrawerOpen(false)}
        onDrawerOpen={() => setIsDrawerOpen(true)}
      >
        <View style={{ margin: 16, flex: 1 }}>
          <Products
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
});

export default ProductsScreen;
