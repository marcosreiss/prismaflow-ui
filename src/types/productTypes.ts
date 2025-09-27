
import type { Brand } from "./brandTypes";

export type Product = {
    id: number;
    name: string;
    description: string;
    costPrice: number;
    markup: number;
    salePrice: number;
    stockQuantity: number;
    minimumStock: number;
    category: string;
    brand: Brand | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};