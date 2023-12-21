export interface CartItem {
    id: string;
    price: number;
    quantity: number;
    totalPrice: number;
    name: string;
    cover: string;
}

export interface CartState {
    itemsList: CartItem[];
    totalQuantity: number;
    finalPrice: number;
}