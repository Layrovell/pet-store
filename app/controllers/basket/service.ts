import { useCallback, useMemo } from 'react';

import { CartStateType, cartActions } from './slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Product } from '@type/product.interface';

type CartServiceOperators = CartStateType & {
  addToBasket: (product: Product) => void;
  removeFromBasket: (product: Product) => void;
  updateQuantity: ({ id, q }: { id: number; q: number }) => void;
  clearBasket: () => void;
  updateTotalPrice: (totalPrice: number) => void;
  totalCount: number;
  setCartDataFromLocalStorage: (cartData: Product[]) => void;
}

const useCartService = (): Readonly<CartServiceOperators> => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);

  return {
    data: cartState.data,
    totalPrice: cartState.totalPrice,
    totalCount: useMemo(() => cartState.data.reduce((acc: any, item: any) => acc + item.quantity, 0), [cartState.data]),
    addToBasket: useCallback((product) => {
      dispatch(cartActions.addToBasket(product));
    }, [dispatch]),
    removeFromBasket: useCallback((product) => {
      dispatch(cartActions.removeFromBasket(product));
    }, [dispatch]),
    updateQuantity: useCallback((data) => {
      dispatch(cartActions.updateQuantity(data));
    }, [dispatch]),
    clearBasket: useCallback(() => {
      dispatch(cartActions.clearBasket());
    }, [dispatch]),
    updateTotalPrice: useCallback((totalPrice) => {
      dispatch(cartActions.updateTotalPrice(totalPrice));
    }, [dispatch]),
    setCartDataFromLocalStorage: useCallback((cartData) => {
      dispatch(cartActions.setCartDataFromLocalStorage(cartData));
    }, [dispatch]),
  };
};

export default useCartService;
