import { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '@components/Screen';
import Link from '@components/Link';
import ActionBar from '@components/ActionBar';
import Products from '@organisms/product/Products';
import HorizontalNav from '@components/navigation/HorizontalNav';
import useCategoriesService from '../controllers/category/service';
import Input from '@components/atoms/Input';
import Icon from '@components/atoms/Icon';
import Stack from '@components/Stack';
import routes from 'navigation/routes';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(4);


  const { loadCategories, data: categories } = useCategoriesService();

  useEffect(() => {
    const params = { page: 1, size: 20 };
    loadCategories(params);
  }, [loadCategories]);

  return (
    <Screen>
      <Input placeholder='Search Product' accessoryLeft={<Icon name='search-outline' />} />

      <Stack spacing={4} style={{ flex: 1 }}>
        <HorizontalNav menuItems={categories?.content.filter((el) => el.parentId)} onSelect={setSelectedCategoryId} />

        <ActionBar title='Recommended for You'>
          <Link
            text='See more'
            variant='body1'
            onPress={() => {
              navigation.navigate(routes.PRODUCTS, { categoryId: selectedCategoryId });
            }}
          />
        </ActionBar>

        <Products
          navigation={navigation}
          selectedCategoryId={selectedCategoryId}
        />
      </Stack>
    </Screen>
  );
};

export default HomeScreen;
