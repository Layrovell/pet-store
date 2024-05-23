import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { DrawerLayout, DrawerPosition, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import useCategoriesService from 'controllers/category/service';
import ProductsFilters from '@organisms/product/ProductsFilters';
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

  const drawerRef = useRef<DrawerLayout>(null);
  const categoryIdParam = route.params.categoryId;

  const { loadAttributesByCategory, attributes, loading: isLoadingAttrs } = useCategoriesService();

  useEffect(() => {
    if (categoryIdParam) {
      loadAttributesByCategory(categoryIdParam);
    }
  }, [loadAttributesByCategory, categoryIdParam]);

  const handleDrawerSlide = (status: any) => {
    console.log(status); // between 0 and 1
  };

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
          onPress={() => {}}
          style={[styles.button, { borderRightWidth: 1, borderRightColor: colors.grey[10] }]}
        >
          <Card style={{ borderColor: 'transparent' }}>
            <Stack spacing={1} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text>Sort</Text>
              <Icon name='arrow-ios-downward-outline' />
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
          return <ProductsFilters data={attributes} isLoading={isLoadingAttrs.attributes} />;
        }}
        onDrawerSlide={handleDrawerSlide}
        onDrawerClose={() => setIsDrawerOpen(false)}
        onDrawerOpen={() => setIsDrawerOpen(true)}
      >
        <View style={{ margin: 16, flex: 1 }}>
          <Products
            navigation={navigation}
            selectedCategoryId={categoryIdParam}
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
