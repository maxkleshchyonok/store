import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateUserDto } from "../types/types";

type User = {
    id: string,
    name: string,
    email: string,
    accessToken: string,
    refreshToken: string,
};

export const loginUser = createAsyncThunk<User, CreateUserDto>('loginUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3001/auth/login', data);
        sessionStorage.setItem('access_token', response.data.accessToken);
        sessionStorage.setItem('userId', response.data.id);
        return response.data;
    } catch (error) {
        return rejectWithValue('SignIn failed')
    }
});
