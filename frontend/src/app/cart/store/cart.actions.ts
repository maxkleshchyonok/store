import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart } from "../types/types";

export const createOrder = createAsyncThunk<Cart, Cart>('createOrder', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3001/order', data);
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with order')
    }
});

export const getOrder = createAsyncThunk('getOrder', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get('http://localhost:3001/order/e82c32b7-6979-48fe-90f5-646dc0f86ecb');
        return response.data;
    } catch (error) {
        return rejectWithValue('Error with getting order')
    }
});