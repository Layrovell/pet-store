import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@type/product.interface';

export type CartStateType = {
  data: Product[];
  totalPrice: number;
};

const initialState: CartStateType = {
  data: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const { id, price } = action.payload;
      const itemIndex = state.data.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.data[itemIndex].quantity += 1;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += price;
      AsyncStorage.setItem('cartData', JSON.stringify(state.data));
    },
    removeFromBasket: (state, action: PayloadAction<Product>) => {
      const { id, price, quantity } = action.payload;
      const itemIndex = state.data.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && state.data[itemIndex].quantity > 1) {
        state.data[itemIndex].quantity -= 1;
      } else {
        state.data = state.data.filter((item) => item.id !== id);
      }
      state.totalPrice -= price * quantity;
      AsyncStorage.setItem('cartData', JSON.stringify(state.data));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.data.findIndex((item) => item.id === id);
      state.data[itemIndex].quantity = quantity;
      AsyncStorage.setItem('cartData', JSON.stringify(state.data));
    },
    clearBasket: (state) => {
      state.data = [];
      state.totalPrice = 0;
      AsyncStorage.removeItem('cartData');
    },
    updateTotalPrice: (state, action) => {
      state.totalPrice += action.payload;
    },
    setCartDataFromLocalStorage: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
    },
  },
});

export const cartActions = {
  addToBasket: cartSlice.actions.addToBasket,
  removeFromBasket: cartSlice.actions.removeFromBasket,
  updateQuantity: cartSlice.actions.updateQuantity,
  clearBasket: cartSlice.actions.clearBasket,
  updateTotalPrice: cartSlice.actions.updateTotalPrice,
  setCartDataFromLocalStorage: cartSlice.actions.setCartDataFromLocalStorage,
};

// Reducer
export default cartSlice.reducer;
