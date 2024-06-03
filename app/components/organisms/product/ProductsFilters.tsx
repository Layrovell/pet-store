import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';

import Checkbox from '@atoms/Checkbox';
import { ActivityIndicator } from '@components/index';
import Stack from '@components/Stack';
import Typography from '@components/Typography';
import Icon from '@components/atoms/Icon';
import useProductFiltration from 'hooks/useProductFiltration';
import AccordionItem from '../AccordionItem';
import { firstUpperLetter, splitBeforeUppercase } from 'utils/stringFormatter';
import RangeDatePicker from '../RangeDatePicker';

interface Props {
  data?: any[];
  isLoading: boolean;
  initialLoadProducts: () => void;
}

const ProductsFilters: React.FC<Props> = ({ data, isLoading, initialLoadProducts }) => {
  const { handleCheckboxChange, selectedAttributesValues, clearAllOptions, dateRange, handleDateChange } = useProductFiltration();

  const renderItem = ({ item, index }: any) => (
    <AccordionItem key={index} title={splitBeforeUppercase(item.name)}>
      <>
        {item.type === 'string' && (
          <View style={{ marginVertical: 5 }}>
            {item.values.map((value: string) => (
              <Checkbox
                key={value}
                checked={selectedAttributesValues[item.name]?.includes(value) || false}
                onChange={() => handleCheckboxChange(item.name, value)}
              >
                <Typography>{firstUpperLetter(value)}</Typography>
              </Checkbox>
            ))}
          </View>
        )}

        {item.type === 'date' && (
          <RangeDatePicker
            key={item.name}
            label='Date range'
            range={dateRange}
            min={new Date(item?.values?.[0])}
            max={new Date(item?.values?.[1])}
            onSelect={(nextRange) => handleDateChange(item.name, nextRange)}
            accessoryRight={<Icon name={'calendar-outline'} />}
          />
        )}
      </>
    </AccordionItem>
  );

  const renderedCategories = useMemo(
    () => <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.name} />,
    [data, selectedAttributesValues, dateRange]
  );

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
