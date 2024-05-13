import { useEffect, useMemo, useState } from 'react';
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
import { CategoryType } from '../interface/category';
import { ActivityIndicator } from '../components';
import { buildTreeView } from '../utils/arrayFormatter';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const catParams = {
  with_category_attributes: false,
};

const DummyScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [parentId, setParentId] = useState(1);

  const { loadProducts, data: products } = useProductsService();
  const { loadCategories, data: categories } = useCategoriesService();
  const { getIsLoading } = usePromiseService();

  const productsIsLoading = getIsLoading(PRODUCT_KEY);

  const menuItems = useMemo(() => buildTreeView(categories?.content), [categories?.content?.length]);

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
      params.categoryId = menuItems?.find((item) => item.id === parentId)?.children?.map((el: CategoryType) => el.id);
    }

    loadProducts(params);
  }, [parentId, selectedCategoryId, menuItems?.length]);

  return (
    <Screen>
      <Stack spacing={6} style={{ flex: 1 }}>
        <Animated.View>
          <Banner title='Royal Canin Adult Pomeraniann' subtitle='Get an interesting promo here, without conditions' />
        </Animated.View>

        <ActionBar title='Categories'>
          <Link text='Load categories' variant='body1' onPress={() => loadCategories(catParams)} />
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
