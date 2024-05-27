import React from 'react';
import type { PropsWithChildren } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Stack from '../Stack';
import Card from '../atoms/Card';
import Typography from '../Typography';
import { firstUpperLetter } from '../../utils/stringFormatter';

interface Props {
  menuItems: any[];
  onSelect?: (v: number) => void;
  selectedItemId: number;
}

const HorizontalNav: React.FC<PropsWithChildren<Props>> = ({ menuItems, onSelect, selectedItemId }) => {
  return (
    <Stack>
      <FlatList
        data={menuItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => {
          return (
            <Stack spacing={2} style={styles.cardContainer}>
              <Card
                onPress={() => {
                  onSelect && onSelect(item.id);
                }}
                style={[styles.card, item.id === selectedItemId && styles.activeCard]}
              >
                <Typography variant='h5'>{item.name.charAt(0).toUpperCase()}</Typography>
              </Card>
              <Typography variant='body3'>{firstUpperLetter(item.name)}</Typography>
            </Stack>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    maxWidth: 74,
  },
  card: {
    width: 74,
    height: 74,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCard: {
    backgroundColor: '#E5E4E3'
  }
});

export default HorizontalNav;
