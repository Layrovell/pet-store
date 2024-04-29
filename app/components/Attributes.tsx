import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import { KeyValuePair } from '../interface/common';

interface Props {
  data: KeyValuePair;
}

const TableRow = ({ item }: any) => {
  return (
    <View style={styles.row}>
      <Text style={styles.key}>{item.key}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );
};

const Attributes: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  const data2 = Object.entries(data).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <View style={styles.container}>
      <FlatList
      data={data2}
      renderItem={({ item }) => <TableRow item={item} />}
      keyExtractor={(item) => item.key} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  key: {
    fontWeight: 'bold',
  },
  value: {
    textAlign: 'right',
  },
});

export default Attributes;
