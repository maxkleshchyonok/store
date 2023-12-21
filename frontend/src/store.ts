import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './app/cart/store/cart.slice';
import { authSlice } from './app/auth/store/auth.slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;