import React, { useMemo } from 'react';
import { FlatList, Text } from 'react-native';

import Checkbox from '@atoms/Checkbox';
import { ActivityIndicator } from '@components/index';
import CollapsibleItem from '../collapsible/CollapsibleItem';
import Button from '@components/atoms/Button';
import Stack from '@components/Stack';
import Typography from '@components/Typography';
import Icon from '@components/atoms/Icon';
import useProductFiltration from 'hooks/useProductFiltration';

interface Props {
  data?: any[];
  isLoading: boolean;
  fetchWithFilters?: (options?: any) => void;
  initialLoadProducts: () => void;
}

const ProductsFilters: React.FC<Props> = ({ data, isLoading, fetchWithFilters, initialLoadProducts }) => {
  const { filterOptions, handleCheckboxChange, selectedAttributesValues, clearAllOptions } = useProductFiltration();

  const renderedCategories = useMemo(() => {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CollapsibleItem key={index} title={item.name}>
            {item.values.map((value: string) => (
              <Checkbox
                key={value}
                checked={selectedAttributesValues[item.name]?.includes(value) || false}
                onChange={() => handleCheckboxChange(item.name, value)}
                style={{ marginVertical: 5 }}
              >
                <Typography>{value}</Typography>
              </Checkbox>
            ))}
          </CollapsibleItem>
        )}
        keyExtractor={(item) => item.name}
      />
    );
  }, [data, selectedAttributesValues, handleCheckboxChange]);

  return (
    <Stack spacing={3} style={{ flex: 1, padding: 16 }}>
      {isLoading ? (
        <ActivityIndicator visible={isLoading} />
      ) : (
        <>
          {renderedCategories}
          <Stack direction='row' spacing={4} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Button style={{ flex: 1 }} onPress={() => fetchWithFilters && fetchWithFilters(filterOptions)}>
              <Text>Apply filters</Text>
            </Button>
            <Icon
              name='trash-outline'
              onPress={() => {
                clearAllOptions();
                initialLoadProducts();
              }}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ProductsFilters;
