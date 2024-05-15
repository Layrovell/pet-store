import React from 'react';
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
import useProductsService from '../controllers/product/service';
import Icon from '../components/atoms/Icon';

const ListItemDeleteAction = ({ onPress }: any) => {
  return (
    <RectButton style={styles.leftAction} onPress={onPress}>
      <Icon name='trash-2-outline' animation='zoom' />
    </RectButton>
  );
};

interface CartItemProps {
  item: Product;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onDelete, onView }) => {
  return (
    <View style={styles.itemContainer}>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => <ListItemDeleteAction onPress={() => onDelete(item.id)} />}
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
                <Typography variant='body2'>category</Typography>
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

interface Props {}

const CartScreen: React.FC<Props> = () => {
  const { loadProducts, data: products } = useProductsService();

  const handleDeleteProduct = (id: number) => {
    console.log('onDelete product with id:', id);
  };

  const handleViewProduct = (id: number) => {
    console.log('view product with id:', id);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container, { paddingHorizontal: 16 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products?.content?.slice(0, 5)}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <CartItem item={item} onDelete={handleDeleteProduct} onView={handleViewProduct} />}
        />
      </View>

      <Footer>
        <Stack spacing={3}>
          <View style={styles.summaryRow}>
            <Typography variant='body3'>3 items</Typography>
            <Typography variant='body3'>$38,97</Typography>
          </View>
          <View style={styles.summaryRow}>
            <Typography variant='body3'>Tax</Typography>
            <Typography variant='body3'>$1,99</Typography>
          </View>
          <View style={styles.summaryRow}>
            <Typography variant='h5'>Totals</Typography>
            <Typography variant='h4'>$36,98</Typography>
          </View>
        </Stack>

        <Button size='large' onPress={() => {}}>Checkout</Button>
      </Footer>
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
});

export default CartScreen;
