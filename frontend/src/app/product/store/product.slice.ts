import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product } from '../types/types';
import { getProduct } from './product.action';

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action ) => {
        state.product = action.payload
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.product = null;
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setProduct, setLoading, setError } = productSlice.actions;

export const authReducer = productSlice.reducer;