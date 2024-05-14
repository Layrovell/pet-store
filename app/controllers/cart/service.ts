import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartActions, selectCart } from './slice';
import { Product } from '../../interface/product.interface';

type CartServiceType = {
  data: Product[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  loadCartData: (key: string) => void; // !!!
}

const useCartService = (): Readonly<CartServiceType> => {
  const dispatch = useAppDispatch();

  return {
    data: useAppSelector(selectCart),
    add:useCallback((itemId) => {
      dispatch(cartActions.add(itemId));
    }, [dispatch]),
    remove: useCallback((itemId) => {
      dispatch(cartActions.remove(itemId))
    }, [dispatch]),
    loadCartData: useCallback((data) => {
      dispatch(cartActions.loadCartData(data))
    }, [dispatch]),
  };
};

export default useCartService;
