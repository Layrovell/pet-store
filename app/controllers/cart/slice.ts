import { Dispatch, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from '../../store/config.store';
import { CartProduct, Product } from '../../interface/product.interface';

interface CartState {
  data: CartProduct[];
}

const initialState: CartState = {
  data: [],
};

export const CART_STORAGE_KEY = '@Shop-user:cart';

export const loadCartDataFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    console.log('=== cartData ===:', cartData);
    return cartData != null ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart data from AsyncStorage:', error);
    return [];
  }
};

const saveCartDataToStorage = async (cartData: any) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart data to AsyncStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      const itemInCart = state.data.find((item) => item.id === action.payload.id);
      if (itemInCart && itemInCart?.quantity) {
        itemInCart.quantity++;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
      saveCartDataToStorage(state.data);
    },
    remove: (state, action: PayloadAction<any>) => {
      state.data = state.data.filter((id) => id !== action.payload);
      saveCartDataToStorage(state.data);
    },
    clearCart(state) {
      state.data = [];
      saveCartDataToStorage(state.data);
    },
    loadCartData(state, action) {
      state.data = action.payload;
    },
  },
});

export const cartActions = {
  add: cartSlice.actions.add,
  remove: cartSlice.actions.remove,
  clearCart: cartSlice.actions.clearCart,
  loadCartData: cartSlice.actions.loadCartData,
};

export const loadCartDataAsync = () => async (dispatch: Dispatch) => {
  const cartData = await loadCartDataFromStorage();
  dispatch(cartActions.loadCartData(cartData));
};

// Selectors
export const selectCart = (state: RootState): any => state.cart.data;

// Reducer
export default cartSlice.reducer;
