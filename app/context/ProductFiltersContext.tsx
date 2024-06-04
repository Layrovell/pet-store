import React, { createContext, useCallback, useState } from 'react';

type SelectedAttributeValues = {
  [key: string]: string[];
};

export type FilterOptionsType = {
  id: string;
  type: string;
  value: string[] | { from?: Date; to?: Date };
};

type SortOptionsType = {
  id: string;
  desc: boolean;
};

type DatesType = { startDate?: Date; endDate?: Date };

export type ProductFiltersStateType = {
  filterOptions: FilterOptionsType[];
  sortOptions: SortOptionsType | undefined;
  addFilterOptions: (options: FilterOptionsType[]) => void;
  clearAllOptions: () => void;
  setSelectedAttributesValues: (attrs: any) => void;
  selectedAttributesValues: any;
  handleCheckboxChange: (attrName: string, v: string) => void;
  updateSortOptions: (sortKey: string, desc: boolean) => void;
  dateRange: DatesType;
  setDateRange: (dates: DatesType) => void;
  handleDateChange: (attrName: string, dates: DatesType) => void;
};

export const ProductFiltersContext = createContext<ProductFiltersStateType | undefined>(undefined);

type CartProviderProps = {
  children: React.ReactNode;
};

export const ProductFiltersContextProvider = ({ children }: CartProviderProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType[]>([]);
  const [selectedAttributesValues, setSelectedAttributesValues] = useState<SelectedAttributeValues>({});
  const [sortOptions, setSortOptions] = useState<SortOptionsType | undefined>(undefined);
  const [dateRange, setDateRange] = React.useState<DatesType>({ startDate: undefined, endDate: undefined });

  const addFilterOptions = useCallback(
    (newOptions: FilterOptionsType[]) => {
      setFilterOptions((prev) => {
        const uniqueOptions = new Map(
          prev.concat(newOptions).map(op => [op.id, op])
        );
  
        return Array.from(uniqueOptions.values())
          .filter(v => Array.isArray(v.value) ? v.value.length > 0 : v.value);
      });
    },
    [filterOptions]
  );

  const clearAllOptions = () => {
    setSelectedAttributesValues({});
    setFilterOptions([]);
    setSortOptions(undefined);
    setDateRange({ startDate: undefined, endDate: undefined })
  };

  const handleCheckboxChange = (attributeName: string, value: string) => {
    setSelectedAttributesValues((prevValues) => {
      const updatedValues = { ...prevValues };
      if (!updatedValues[attributeName]) {
        updatedValues[attributeName] = [];
      }
      if (updatedValues[attributeName].includes(value)) {
        updatedValues[attributeName] = updatedValues[attributeName].filter((v) => v !== value);
      } else {
        updatedValues[attributeName].push(value);
      }

      // Update filter options
      const newOptions = Object.keys(updatedValues).reduce((acc: FilterOptionsType[], key) => {
        acc.push({
          id: `productAttributeNames.${key}`,
          type: 'includesValue',
          value: updatedValues[key],
        });
        return acc;
      }, []);
      addFilterOptions(newOptions);

      return updatedValues;
    });
  };

  const handleDateChange = (attributeName: string, dates: DatesType) => {
    setDateRange(dates);

    const newOptions = Object.keys(dates).reduce((acc: FilterOptionsType[]) => {
      acc.push({
        id: `productAttributeNames.${attributeName}`,
        type: 'dateBetween',
        value: {
          from: dates.startDate,
          to: dates.endDate,
        },
      });
      return acc;
    }, []);

    addFilterOptions(newOptions);
  };

  const updateSortOptions = (sortKey: string, desc: boolean) => {
    setSortOptions({ id: sortKey, desc });
  };

  return (
    <ProductFiltersContext.Provider
      value={{
        filterOptions,
        addFilterOptions,
        clearAllOptions,
        setSelectedAttributesValues,
        selectedAttributesValues,
        handleCheckboxChange,
        updateSortOptions,
        sortOptions,
        dateRange,
        setDateRange,
        handleDateChange,
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
};
