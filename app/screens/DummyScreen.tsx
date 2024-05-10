import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Animated, Button, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Screen from '../components/Screen';
import Stack from '../components/Stack';
import Link from '../components/Link';
import AppButton from '../components/Button';
import ActionBar from '../components/ActionBar';
import Banner from '../components/Banner';
import Typography from '../components/Typography';
import List from '../components/product/List';
import useProductsService from '../features/product/service';
import useCategoriesService from '../features/category/service';
import colors from '../config/colors';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const catParams = {
  with_category_attributes: false,
};

const DummyScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    loadCategories(catParams);
    loadProducts();
  }, []);

  const { loadProducts, data: products } = useProductsService();
  const { loadCategories, data: categories } = useCategoriesService();

  const [childCategories, serChildCategories] = useState<any[]>([]);

  const topLevelCategories = useMemo(() => {
    return categories?.content?.filter((c) => !c.parentId);
  }, [categories?.content]);

  const getChildCategories = useCallback((id: number) => {
    if (!categories?.content.length) {
      return;
    }

    const res = categories.content.filter((c) => c.parentId === id);

    if (!res?.length) {
      return;
    }

    serChildCategories(res);
  }, [categories?.content]);

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Screen>
      <Stack spacing={6}>
        <Banner title='Royal Canin Adult Pomeraniann' subtitle='Get an interesting promo here, without conditions' />

        <ActionBar title='Categories'>
          <Link text='View all' color={colors.secondary.main} onPress={() => {}} />
        </ActionBar>

        <Stack spacing={2}>
          <Stack spacing={2} direction='row'>
            {topLevelCategories?.map((c, idx) => (
              <AppButton
                key={idx}
                variant={'body1'}
                title={c.name}
                onPress={() => getChildCategories(c.id)}
                color={colors.secondary.main}
                size='lg'
                radius={16}
              />
            ))}
          </Stack>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={200}
            children={
              <Stack direction='row' spacing={2}>
                {childCategories?.map((c, idx) => (
                  <AppButton
                    key={idx}
                    variant={'body1'}
                    isOutlined
                    title={c.name}
                    onPress={() => getChildCategories(c.id)}
                    color={colors.secondary.main}
                    size='md'
                    radius={16}
                  />
                ))}
              </Stack>
            }
          />
        </Stack>

        <ActionBar title='Products'>
          <Link text='View all' color={colors.secondary.main} onPress={() => {}} />
        </ActionBar>

        {products?.content.length ? (
          <List dataset={products.content} navigation={navigation} />
        ) : (
          <View style={{ padding: 26, alignItems: 'center' }}>
            <Typography>No products</Typography>
          </View>
        )}
      </Stack>
    </Screen>
  );
};

export default DummyScreen;
