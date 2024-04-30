import React from 'react';
import { Text, StyleSheet, FlatList, View, Image } from 'react-native';

import Screen from '../components/Screen';
import colors from '../config/colors';

const mockData = [
  {
    id: 0,
    category: {
      id: 0,
      name: 'dog',
    },
    name: 'doggie',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 0,
        name: 'dog111',
      },
    ],
    status: 'available',
  },
  {
    id: 1,
    category: {
      id: 1,
      name: 'cat',
    },
    name: 'kitten',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 1,
        name: 'string',
      },
    ],
    status: 'available',
  },
];

interface Props {}

const CartScreen: React.FC<Props> = () => {
  function renderMealItem(itemData: any) {
    const item = itemData.item;
    console.log('=== item:', item);

    return (
      <View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
          <Text>text</Text>
        </View>
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mockData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderMealItem}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
  },
  listContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default CartScreen;
