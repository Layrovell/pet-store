import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, Text } from 'react-native';

import Checkbox from '@atoms/Checkbox';
import { ActivityIndicator } from '@components/index';
import CollapsibleItem from '../collapsible/CollapsibleItem';
import Button from '@components/atoms/Button';

interface Props {
  data?: any[];
  isLoading: boolean;
}

const ProductsFilters: React.FC<Props> = ({ data, isLoading }) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

  const handleCheckboxChange = useCallback((category: string, value: string) => {
    setSelectedValues((prev: any) => {
      const newValues: any = { ...prev };
      if (!newValues[category]) {
        newValues[category] = [];
      }
      if (newValues[category].includes(value)) {
        newValues[category] = newValues[category].filter((v: any) => v !== value);
      } else {
        newValues[category].push(value);
      }
      return newValues;
    });
  }, []);

  const renderedCategories = useMemo(() => {
    return (
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CollapsibleItem key={index} title={item.name}>
            {item.values.map((value: any) => (
              <Checkbox
                key={value}
                checked={selectedValues[item.name]?.includes(value) || false}
                onChange={() => handleCheckboxChange(item.name, value)}
                style={{ marginVertical: 5 }}
              >
                {value}
              </Checkbox>
            ))}
          </CollapsibleItem>
        )}
        keyExtractor={(item) => item.name}
      />
    );
  }, [data, selectedValues, handleCheckboxChange]);

  // console.log('=== selectedValues ===:', selectedValues);

  return (
    <View style={{ margin: 16 }}>
      {isLoading ? (
        <ActivityIndicator visible={isLoading} />
      ) : (
        <>
          {renderedCategories}
          <Button>
            <Text>load</Text>
          </Button>
        </>
      )}
    </View>
  );
};

// const areEqual = (prevProps: Props, nextProps: Props) => {
//   return prevProps.isLoading === nextProps.isLoading && prevProps.data === nextProps.data;
// };

// export default React.memo(ProductsFilters, areEqual);

export default ProductsFilters;
