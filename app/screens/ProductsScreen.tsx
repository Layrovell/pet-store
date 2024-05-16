import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {}

const ProductsScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Product filters Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductsScreen;
