export type User = {
    id: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export type CreateUserDto = {
    username: string,
    password: string,
};

export type RegisterUserDto = {
    name: string;
    email: string;
    password: string;
}