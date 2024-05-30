import React, { createContext, useCallback, useState } from 'react';

type SelectedAttributeValues = {
  [key: string]: string[];
};

export type FilterOptionsType = {
  id: string;
  type: string;
  value: string[];
};

type SortOptionsType = {
  id: string;
  desc: boolean;
}

export type ProductFiltersStateType = {
  filterOptions: any;
  sortOptions: SortOptionsType | undefined;
  addFilterOptions: (options: any[]) => void;
  clearAllOptions: () => void;
  setSelectedAttributesValues: (attrs: any) => void;
  selectedAttributesValues: any;
  handleCheckboxChange: any;
  updateSortOptions: (sortKey: string, desc: boolean) => void;
};

export const ProductFiltersContext = createContext<ProductFiltersStateType | undefined>(undefined);

type CartProviderProps = {
  children: React.ReactNode;
};

export const ProductFiltersContextProvider = ({ children }: CartProviderProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType[]>([]);
  const [selectedAttributesValues, setSelectedAttributesValues] = useState<SelectedAttributeValues>({});
  const [sortOptions, setSortOptions] = useState<SortOptionsType | undefined>(undefined);

  const addFilterOptions = useCallback(
    (newOptions: FilterOptionsType[]) => {
      setFilterOptions(newOptions);
    },
    [filterOptions]
  );

  const clearAllOptions = () => {
    console.log('CLEAR');
    setSelectedAttributesValues({});
    setFilterOptions([]);
    setSortOptions(undefined);
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
        if (updatedValues[key].length > 0) {
          acc.push({
            id: `productAttributeNames.${key}`,
            type: 'includesValue',
            value: updatedValues[key],
          });
        }
        return acc;
      }, []);
      // const newOptions = Object.keys(updatedValues).map((key) => ({
      //   id: `productAttributeNames.${key}`,
      //   type: 'includesValue',
      //   value: updatedValues[key],
      // }));
      addFilterOptions(newOptions);

      return updatedValues;
    });
  };

  const updateSortOptions = (sortKey: string, desc: boolean) => {
    console.log('updateSortOptions:', desc);
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
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
};
