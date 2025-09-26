// src/models/brandModel.ts

// A entidade Brand
export interface Brand {
    id: number;
    name: string;
    isActive: boolean;
}

// Interface genérica para a estrutura de paginação
export interface Page<T> {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    content: T[];
}

// Resposta da API para a lista de marcas (com paginação)
export interface BrandListResponse {
    status: number;
    message: string;
    data: Page<Brand>;
    timestamp: string;
    path: string;
}

// Resposta da API para uma única marca (getById, create, update)
export interface BrandResponse {
    status: number;
    message: string;
    data: Brand;
    timestamp: string;
    path: string;
}

// Estrutura para a resposta de exclusão
export interface DeleteBrandResponse {
    status: number;
    message: string;
    data: null; // Ou um objeto com o item deletado, dependendo da sua API
    timestamp: string;
    path: string;
}