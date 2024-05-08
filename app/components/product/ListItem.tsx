import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../../config/colors';
import { Product } from '../../interface/product.interface';
import Typography from '../Typography';
import IconButton from '../IconButton';
import Stack from '../Stack';

interface Props {
  item: Product;
  onPress?: () => void;
  onPressBuy: () => void;
}

const ListItem: React.FC<Props> = ({ item, onPress, onPressBuy }) => {
  const { name, images, status, price } = item;

  return (
    <View style={styles.item}>
      <View style={styles.innerContainer}>
        <Stack spacing={2}>
          <TouchableOpacity onPress={onPress}>
            <Image source={{ uri: images[0] }} style={styles.image} />
          </TouchableOpacity>

          <View>
            <Typography style={{ textTransform: 'capitalize' }}>{name}</Typography>
            <View style={styles.titleSection}>
              <Typography variant='h4' style={styles.price}>
                ${price}
              </Typography>
              <IconButton name={'add'} size={18} iconColor={colors.white} backgroundColor={colors.secondary.main} />
            </View>
          </View>
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 0.5,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
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

export default ListItem;
