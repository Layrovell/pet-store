import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { ProductStatus, StatusType } from '../interface/product.interface';

interface Props {
  status: StatusType;
}

const statusConfig = {
  [ProductStatus.available]: 'green',
  [ProductStatus.pending]: 'blue',
  [ProductStatus.sold]: 'orange',
};

const Status: React.FC<Props> = ({ status }) => {
  return (
    <Text style={[styles.status, { color: statusConfig[status as StatusType] }]}>{status}</Text>
  );
};

const styles = StyleSheet.create({
  status: {
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'capitalize',
  },
});

export default Status;
