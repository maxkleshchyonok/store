import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";

export const getProduct = createAsyncThunk('getProduct', async (_, { rejectWithValue }) => {
    try {
        const response = await repository.get('/product');
        return response.data;
    } catch (error) {
        return rejectWithValue('Loading products failed');
    }
});