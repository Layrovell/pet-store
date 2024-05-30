import React, { useMemo } from 'react';
import { FlatList, Text } from 'react-native';

import Checkbox from '@atoms/Checkbox';
import { ActivityIndicator } from '@components/index';
import CollapsibleItem from '../AccordionItem';
import Button from '@components/atoms/Button';
import Stack from '@components/Stack';
import Typography from '@components/Typography';
import Icon from '@components/atoms/Icon';
import useProductFiltration from 'hooks/useProductFiltration';
import AccordionItem from '../AccordionItem';

interface Props {
  data?: any[];
  isLoading: boolean;
  initialLoadProducts: () => void;
}

const ProductsFilters: React.FC<Props> = ({ data, isLoading, initialLoadProducts }) => {
  const { handleCheckboxChange, selectedAttributesValues, clearAllOptions } = useProductFiltration();

  const renderedCategories = useMemo(() => {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          // <CollapsibleItem key={index} title={item.name}>
          // {item.values.map((value: string) => (
          //   <Checkbox
          //     key={value}
          //     checked={selectedAttributesValues[item.name]?.includes(value) || false}
          //     onChange={() => handleCheckboxChange(item.name, value)}
          //     style={{ marginVertical: 5 }}
          //   >
          //     <Typography>{value}</Typography>
          //   </Checkbox>
          // ))}
          // </CollapsibleItem>
          <AccordionItem key={index} title={item.name}>
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
          </AccordionItem>
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
          <Stack style={{ alignItems: 'flex-end' }}>
            <Icon
              name='trash-outline'
              onPress={() => {
                clearAllOptions();
                initialLoadProducts();
              }}
            />
          </Stack>
          {renderedCategories}
        </>
      )}
    </Stack>
  );
};

export default ProductsFilters;
