import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartState } from '../types/types';
import { createOrder, getOrder, getOrderProduct } from './cart.actions';

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action ) => {
        state.cart = action.payload
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.cart = null;
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action ) => {
        state.cart = action.payload
        state.loading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.cart = null;
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderProduct.fulfilled, (state, action ) => {
        state.cart = action.payload
        state.loading = false;
      })
      .addCase(getOrderProduct.rejected, (state, action) => {
        state.cart = null;
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setCart, setLoading, setError } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;