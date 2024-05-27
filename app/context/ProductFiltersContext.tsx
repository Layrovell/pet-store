import React, { useCallback, useState } from 'react';

type SelectedAttributeValues = {
  [key: string]: string[];
};

export type FilterOptionsType = {
  id: string;
  type: string;
  value: string[];
};

export type ProductFiltersStateType = {
  filterOptions: any;
  addFilterOptions: any;
  clearAllOptions: any;
  setSelectedAttributesValues: any;
  selectedAttributesValues: any;
  handleCheckboxChange: any;
};

export const ProductFiltersContext = React.createContext<ProductFiltersStateType>({
  filterOptions: [],
  addFilterOptions: (options: any) => {},
  clearAllOptions: () => {},
  setSelectedAttributesValues: (attrs: any) => {},
  selectedAttributesValues: {},
  handleCheckboxChange: (attributeName: string, value: string) => {},
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const ProductFiltersContextProvider = ({ children }: CartProviderProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType[]>([]);
  const [selectedAttributesValues, setSelectedAttributesValues] = useState<SelectedAttributeValues>({});

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

  return (
    <ProductFiltersContext.Provider
      value={{
        filterOptions,
        addFilterOptions,
        clearAllOptions,
        setSelectedAttributesValues,
        selectedAttributesValues,
        handleCheckboxChange,
      }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
};
