import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk('getProduct', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:3001/product');
        return response.data;
    } catch (error) {
        return rejectWithValue('Loading products failed');
    }
});