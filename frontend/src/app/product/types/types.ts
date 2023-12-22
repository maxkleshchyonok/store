export interface ProductState {
    product: Product | null;
    loading: boolean;
    error: string | null
}

export interface Product {
    id: string;
    name: string;
    description: string;
    amount: number;
    price: number;
    category: string;
    images: string[]
}