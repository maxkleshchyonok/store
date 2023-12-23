export interface Cart {
    userId: string | null;
    items: OrderItem;
}

export type OrderItem = {
    productId: number;
    quantity: number;
    price: number;
}

export type CartState = {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}
