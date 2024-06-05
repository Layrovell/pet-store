import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, Image, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
// components
import Typography from '../components/Typography';
import Stack from '../components/Stack';
import Footer from '../components/Footer';
import Button from '../components/atoms/Button';
// hooks
import { Product } from '../interface/product.interface';
import colors from '../config/colors';
import useCartService from 'controllers/basket/service';
import { twoDecimals } from 'utils/numberFormatter';
import useCategoriesService from 'controllers/category/service';
import Icon from '../components/atoms/Icon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@type/navigation';
import routes from 'navigation/routes';

const ListItemDeleteAction = ({ onPress }: any) => {
  return (
    <RectButton style={styles.leftAction} onPress={onPress}>
      <Icon name='trash-2-outline' animation='zoom' />
    </RectButton>
  );
};

interface CartItemProps {
  item: Product;
  onDelete: (product: Product) => void;
  onView: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onDelete, onView }) => {
  const { categoryById, loadCategoryById } = useCategoriesService();

  useEffect(() => {
    if (item.categoryId) {
      loadCategoryById(item.categoryId);
    }
  }, [item?.categoryId]);

  return (
    <View style={styles.itemContainer}>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => <ListItemDeleteAction onPress={() => onDelete(item)} />}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => onView(item.id)}>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
            />
            <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
              <View style={styles.container}>
                <Typography variant='h5' style={{ textTransform: 'capitalize' }}>
                  {item?.name}
                </Typography>
                <Typography variant='body2'>Category: {categoryById?.name}</Typography>
                <Typography variant='body3'>Quantity: {item?.quantity}</Typography>
              </View>

              <Typography variant='h5' color={colors.secondary.main}>
                ${item.price}
              </Typography>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

type Props = StackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { data, totalPrice, removeFromBasket, totalCount, clearBasket } = useCartService();

  const handleDeleteProduct = (product: Product) => {
    removeFromBasket(product);
  };

  const handleViewProduct = (id: number) => {
    console.log('view product with id:', id);
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <>
          <View style={[styles.container, { paddingHorizontal: 16 }]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <CartItem item={item} onDelete={handleDeleteProduct} onView={handleViewProduct} />
              )}
            />
          </View>

          <Footer>
            <Stack spacing={3}>
              <View style={styles.summaryRow}>
                <Typography variant='body3'>{totalCount} items</Typography>
                <Typography variant='body3'>${twoDecimals(totalPrice)}</Typography>
              </View>
              <View style={styles.summaryRow}>
                <Typography variant='body3'>Tax</Typography>
                <Typography variant='body3'>${1.99}</Typography>
              </View>
              <View style={styles.summaryRow}>
                <Typography variant='h5'>Totals</Typography>
                <Typography variant='h4'>${twoDecimals(totalPrice) + 1.99}</Typography>
              </View>
            </Stack>

            <Button size='large' onPress={() => {}}>
              Checkout
            </Button>
          </Footer>
        </>
      ) : (
        <Stack spacing={3} style={styles.center}>
          <Typography variant='h5'>Your cart is empty</Typography>
          <Button onPress={() => navigation.navigate(routes.HOME)}>Home</Button>
        </Stack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: 8,
    marginHorizontal: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grey[10],
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  leftAction: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginLeft: 16,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
