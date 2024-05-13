import React, { useEffect, useMemo, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { FlatList } from 'react-native';

import Stack from '../Stack';
import AppButton from '../Button';

interface Props {
  onScroll?: any;
  menuItems: any[];
  onSelect?: (v: number) => void;
  parentId: number;
  setParentId: (v: number) => void;
}

const HorizontalNav: React.FC<PropsWithChildren<Props>> = ({
  onScroll,
  menuItems,
  onSelect,
  parentId,
  setParentId,
}) => {
  const scrollViewRef = useRef<FlatList | null>(null);

  const children = useMemo(() => {
    if (!parentId || !menuItems?.length) {
      return [];
    }

    const parent = menuItems.find((el) => el.id === parentId);

    if (!parent?.children.length) {
      return [];
    }

    return parent.children;
  }, [parentId, menuItems?.length]);

  useEffect(() => {
    if (children?.length > 0) {
      scrollViewRef?.current?.scrollToIndex({ index: 0, animated: true });
    }
  }, [children?.length]);

  return (
    <Stack spacing={2}>
      <FlatList
        data={menuItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6 }}
        renderItem={({ item }) => (
          <AppButton
            variant={'body1'}
            size='md'
            title={item.name}
            onPress={() => {
              console.log('=== item.id:', item.id);
              
              setParentId(item.id);
              onSelect && onSelect(item.id);
            }}
            radius={8}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <FlatList
        data={children}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{ gap: 6 }}
        renderItem={({ item }) => (
          <AppButton
            variant={'body1'}
            isOutlined
            title={item.name}
            onPress={() => onSelect && onSelect(item.id)}
            radius={8}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Stack>
  );
};

export default HorizontalNav;
