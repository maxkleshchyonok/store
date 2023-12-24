import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart, CartItem, OrderItem } from "../types/types";

export const createOrder = createAsyncThunk<Cart, CartItem>('createOrder', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3001/order', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with order')
    }
});

export const getOrder = createAsyncThunk('getOrder', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`http://localhost:3001/order/${sessionStorage.getItem('userId')}`);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with getting order');
    }
});

export const getOrderProduct = createAsyncThunk('getProduct', async (productId: number | null, {rejectWithValue}) => {
    try{
        const response = await axios.get(`http://localhost:3001/product/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with order item');
    }
})

export const confirmOrder = createAsyncThunk('confirmOrder', async (orderId: number, {rejectWithValue}) => {
    try {
        const response = await axios.patch(`http://localhost:3001/order/status/${orderId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with updating order');
    }
})