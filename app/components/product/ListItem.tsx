import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../../config/colors';
import AppButton from '../Button';
import Status from '../Status';
import { ProductStatus } from '../../interface/product.interface';

interface Props {
  photoUrls: string[];
  name: string;
  id: string;
  status: ProductStatus;
  price: string;
  category: string;
  onPress?: () => void;
  onPressBuy: () => void;
}

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const gap = 5;

const availableSpace = screenWidth - (numColumns - 1) * gap;
const itemSize = availableSpace / numColumns;

const ListItem: React.FC<Props> = ({ name, photoUrls, status, price, onPress, onPressBuy }) => {
  return (
    <View style={styles.item}>
      <View style={styles.innerContainer}>
        <View>
          {/* <Pressable
            android_ripple={{ color: '#ccc' }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
          > */}
          <TouchableOpacity onPress={onPress}>
            <Image source={{ uri: photoUrls[0] }} style={styles.image} />
          </TouchableOpacity>
          {/* </Pressable> */}

          <View style={styles.titleSection}>
            <Text style={styles.title}>{name}</Text>
            <FontAwesome name={'heart-o'} size={18} color={colors.primary} />
          </View>
          <Status status={status} />
          <View style={styles.titleSection}>
            <Text style={styles.price}>{price}</Text>
            <AppButton title='Buy' onPress={onPressBuy} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    // maxWidth: Dimensions.get('window').width / 2,
    // width: itemSize,
    flex: 0.5,
    // height: itemSize,
    // width: itemSize,
  },
  buttonPressed: {
    // opacity: 0.5,
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.primary,
    textTransform: 'capitalize',
  },

  titleSection: {
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
  },
  category: {},
});

export default ListItem;
