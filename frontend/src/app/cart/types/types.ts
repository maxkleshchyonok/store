export interface Cart {
    userId: string | null;
    items: OrderItem[];
}

export type OrderItem = {
    productId: number | null;
    quantity: number;
    price: number;
    id?: number;
    orderId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export type CartState = {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

export interface CartItem{
    userId: string | null;
    items: OrderItem;
}

export type CartPageItem = {
    name: string;
    description: string;
    images: string[];
    quantity: number;
    price: number;
}

export type OrderFromResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    totalPrice: number;
    userId: string;
    status: string;
    items: OrderItem[]
}

