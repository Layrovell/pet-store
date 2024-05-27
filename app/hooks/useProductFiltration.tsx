import { useContext } from 'react';
import { ProductFiltersContext } from 'context/ProductFiltersContext';

const useProductFiltration = () => {
  const context = useContext(ProductFiltersContext);

  if (!context) throw new Error('ProductFilters context must be use inside AuthProvider');

  return context;
};

export default useProductFiltration;
