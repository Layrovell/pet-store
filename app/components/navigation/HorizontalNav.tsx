import React from 'react';
import type { PropsWithChildren } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import Stack from '../Stack';
import Card from '../atoms/Card';
import Typography from '../Typography';
import { firstUpperLetter } from '../../utils/stringFormatter';
import { getNavItemIcon } from 'config/UI/CustomIcons';

interface Props {
  menuItems: any[];
  onPress: (id: number) => void;
}

const { width } = Dimensions.get('screen');

const HorizontalNav: React.FC<PropsWithChildren<Props>> = ({ menuItems, onPress }) => {
  return (
    <Stack>
      <FlatList
        data={menuItems?.filter((el) => !el.parentId)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {
          return (
            <Stack spacing={2} style={styles.cardContainer}>
              <Card onPress={() => onPress(item.id)}>
                <View style={styles.icon}>{getNavItemIcon(item.id)}</View>
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
  container: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    width: width / 3 - 24,
  },
  icon: {
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HorizontalNav;
