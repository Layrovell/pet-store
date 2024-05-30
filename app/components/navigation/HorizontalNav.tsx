import React from 'react';
import type { PropsWithChildren } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Stack from '../Stack';
import Card from '../atoms/Card';
import Typography from '../Typography';
import { firstUpperLetter } from '../../utils/stringFormatter';
import { getNavItemIcon } from 'config/UI/CustomIcons';

interface Props {
  menuItems: any[];
  onSelect?: (v: number) => void;
  selectedItemId: number;
}

const HorizontalNav: React.FC<PropsWithChildren<Props>> = ({ menuItems, onSelect, selectedItemId }) => {
  console.log('menuItems:', menuItems);

  return (
    <Stack>
      <FlatList
        data={menuItems?.filter((el) => !el.parentId)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, justifyContent: 'center', alignItems: 'center' }}
        renderItem={({ item }) => {
          return (
            <Stack spacing={2} style={styles.cardContainer}>
              <Card
                onPress={() => {
                  onSelect && onSelect(item.id);
                }}
                style={styles.card}
              >
                <View>{getNavItemIcon(item.id)}</View>
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
});

export default HorizontalNav;
