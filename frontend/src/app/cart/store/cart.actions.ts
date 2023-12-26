import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cart, CartItem, OrderItem } from "../types/types";
import repository from "../../../repository";

export const createOrder = createAsyncThunk<Cart, CartItem>('createOrder', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/order', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with order')
    }
});

export const getOrder = createAsyncThunk('getOrder', async (_, { rejectWithValue }) => {
    try {
        const response = await repository.get(`order/${sessionStorage.getItem('userId')}`)
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with getting order');
    }
});

export const getOrderProduct = createAsyncThunk('getProduct', async (productId: number | null, { rejectWithValue }) => {
    try {
        const response = await repository.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with order item');
    }
})

export const confirmOrder = createAsyncThunk('confirmOrder', async (orderId: number, { rejectWithValue }) => {
    try {
        const response = await repository.patch(`/order/status/${orderId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with updating order');
    }
})