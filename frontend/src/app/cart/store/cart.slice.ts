import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "../types/types";

const initialState: CartState = {
  itemsList: [],
  totalQuantity: 0,
  finalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existItem = state.itemsList.find((item) => item.id === newItem.id);
      if (existItem) {
        existItem.quantity++;
        existItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          cover: newItem.cover,
        });
        state.totalQuantity++;
      }
    }
  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;