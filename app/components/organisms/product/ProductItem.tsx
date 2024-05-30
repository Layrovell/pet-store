import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import colors from '../../../config/colors';
import Typography from '@components/Typography';
import Stack from '@components/Stack';
import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import { Product } from '@type/product.interface';

interface Props {
  item: Product;
  onPress?: () => void;
  onPressBuy: () => void;
  viewableItems: Animated.SharedValue<ViewToken[]>;
}

const ProductItem: React.FC<Props> = React.memo(({ item, onPress, onPressBuy, viewableItems }) => {
  const { name, productAttributeNames, price, categoryId } = item;
  
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item: any) => item.isViewable)
        .find((viewableItem: any) => viewableItem.item.id === item.id)
    )

    return {
      opacity: withTiming(isVisible ? 1 : 0.8),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.8) }]
    }
  }, []);

  return (
    <Animated.View style={[styles.item, rStyle && rStyle]}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1491629378451-b740fed22d86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.image}
            />
          </TouchableOpacity>

          <View style={styles.innerContainer}>
            <Stack spacing={1}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{name}</Typography>
              <Typography variant='body3'>Category: {categoryId}</Typography>
            </Stack>
            <View style={styles.titleSection}>
              <Typography variant='h4' style={styles.price}>
                ${price}
              </Typography>
              <Button size='tiny' accessoryLeft={<Icon name='plus-outline' />}></Button>
            </View>
          </View>
    </Animated.View>
  );
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});

const styles = StyleSheet.create({
  item: {
    flex: 0.5,
    backgroundColor: colors.background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  innerContainer: {
    padding: 8,
    justifyContent: 'space-between',
    minHeight: 120,
  },
  image: {
    width: '100%',
    height: 60,
  },
  titleSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
  },
});

export default ProductItem;
