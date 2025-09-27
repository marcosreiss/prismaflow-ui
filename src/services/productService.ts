import baseApi from './config/api';
import type { ApiResponse, PagedApiResponse, DeleteResult } from '@/types/apiResponse';
import type { Product } from '@/types/productTypes';

/**
 * GET /api/products
 * Lista todos os produtos com paginação
 */
export const getProductsService = async (params: {
    page: number;
    size: number;
    search?: string;
}): Promise<PagedApiResponse<Product>> => {
    const response = await baseApi.get<PagedApiResponse<Product>>('api/products', { params });
    return response.data;
};

/**
 * GET /api/products/{id}
 * Obtém um produto pelo ID
 */
export const getProductByIdService = async (id: number): Promise<ApiResponse<Product>> => {
    const response = await baseApi.get<ApiResponse<Product>>(`api/products/${id}`);
    return response.data;
};

/**
 * POST /api/products
 * Cria um novo produto
 */
export const createProductService = async (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salePrice' | 'brand'>
): Promise<ApiResponse<Product>> => {
    const response = await baseApi.post<ApiResponse<Product>>('api/products', productData);
    return response.data;
};

/**
 * PUT /api/products/{id}
 * Atualiza um produto existente
 */
export const updateProductService = async (
    id: number,
    productData: Partial<Product>
): Promise<ApiResponse<Product>> => {
    const response = await baseApi.put<ApiResponse<Product>>(`api/products/${id}`, productData);
    return response.data;
};

/**
 * DELETE /api/products/{id}
 * Exclui um produto pelo ID
 */
export const deleteProductService = async (id: number): Promise<ApiResponse<DeleteResult<Product>>> => {
    const response = await baseApi.delete<ApiResponse<DeleteResult<Product>>>(`api/products/${id}`);
    return response.data;
};