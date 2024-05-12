import { useEffect, useMemo, useRef, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Animated, View } from 'react-native';

import Screen from '../components/Screen';
import Stack from '../components/Stack';
import Link from '../components/Link';
import ActionBar from '../components/ActionBar';
import Banner from '../components/Banner';
import Typography from '../components/Typography';
import List from '../components/product/List';
import useProductsService from '../controllers/product/service';
import useCategoriesService from '../controllers/category/service';
import usePromiseService from '../controllers/promises/service';
import { PRODUCT_KEY } from '../store/config.store';
import HorizontalNav from '../components/navigation/HorizontalNav';
import { CategoryNavigationType, CategoryType } from '../interface/category';
import { ActivityIndicator } from '../components';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const catParams = {
  with_category_attributes: false,
};

const DummyScreen: React.FC<Props> = ({ navigation }) => {
  const { loadProducts, data: products } = useProductsService();
  const { loadCategories, data: categories } = useCategoriesService();
  const { getIsLoading } = usePromiseService();

  const productsIsLoading = getIsLoading(PRODUCT_KEY);

  function buildTreeView(arr: CategoryType[]) {
    if (!arr?.length) {
      return [];
    }

    const menu: { [key: number]: CategoryNavigationType } = {};

    arr.forEach((element) => {
      if (!element.parentId) {
        menu[element.id] = { ...element, children: [] };
      }
    });

    arr
      .filter((el) => el.parentId !== null)
      .forEach((element) => {
        const parent = menu[element.parentId as number];
        parent.children.push(element);
      });

    return Object.values(menu);
  }

  const menuItems = useMemo(() => buildTreeView(categories?.content), [categories?.content?.length]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [parentId, setParentId] = useState(1);

  useEffect(() => {
    loadCategories(catParams);
  }, []);

  useEffect(() => {
    const params: any = {
      with_category_attributes: false,
    };

    if (parentId !== selectedCategoryId) {
      params.categoryId = [selectedCategoryId];
    } else {
      params.categoryId = menuItems?.find((item) => item.id === parentId)?.children?.map((el) => el.id);
    }

    loadProducts(params);
  }, [parentId, selectedCategoryId, menuItems?.length]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const bannerTranslation = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <Screen>
      <Stack spacing={6} style={{ flex: 1 }}>
        <Animated.View style={{ transform: [{ translateY: bannerTranslation }] }}>
          <Banner title='Royal Canin Adult Pomeraniann' subtitle='Get an interesting promo here, without conditions' />
        </Animated.View>

        <ActionBar title='Categories'>
          <Stack spacing={0}>
            <Link text='Load products' variant='body1' onPress={loadProducts} />
            <Link text='Load categories' variant='body1' onPress={() => loadCategories(catParams)} />
          </Stack>
        </ActionBar>

        <Stack spacing={2}>
          <HorizontalNav
            menuItems={menuItems}
            onSelect={setSelectedCategoryId}
            parentId={parentId}
            setParentId={setParentId}
          />
        </Stack>

        <ActionBar title='Products'>
          <Link text='View all' variant='body1' onPress={() => {}} />
        </ActionBar>

        <View style={{ flex: 1 }}>
          {products?.content.length ? <List dataset={products.content} navigation={navigation} /> : null}
          {productsIsLoading && <ActivityIndicator visible={productsIsLoading} />}
          {!productsIsLoading && !products?.content.length && <Typography>No data</Typography>}
        </View>
      </Stack>
    </Screen>
  );
};

export default DummyScreen;
