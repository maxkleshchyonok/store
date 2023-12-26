import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserDto, RegisterUserDto } from "../types/types";
import repository from "../../../repository";

type User = {
    id: string,
    name: string,
    email: string,
    accessToken: string,
    refreshToken: string,
};

export const loginUser = createAsyncThunk<User, CreateUserDto>('loginUser', async (data, { rejectWithValue }) => {
    try {
        const response = await repository.post('/auth/login', data);
        sessionStorage.setItem('access_token', response.data.accessToken);
        sessionStorage.setItem('userId', response.data.id);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        return response.data;
    } catch (error) {
        return rejectWithValue('SignIn failed')
    }
});

export const registerUser = createAsyncThunk<User, RegisterUserDto>('registerUser', async (data, {rejectWithValue}) => {
    try {
        const response = await repository.post('/auth/register', data);
        return response.data;
    } catch(error) {
        return rejectWithValue('SignUp failed');
    }
})
