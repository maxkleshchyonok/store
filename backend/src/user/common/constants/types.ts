export type User = {
    id: string;
    name: string;
    email: string;
    roles: string[];
    hashedPassword: string;
    createdAt: Date;
    updateAt: Date;
};