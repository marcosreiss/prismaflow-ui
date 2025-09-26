// src/services/brandService.ts

import baseApi from './config/api';
import type {
    Brand,
    BrandListResponse,
    BrandResponse,
    DeleteBrandResponse,
} from '@/models/brandModel';

/**
 * GET /api/brands
 * Lista todas as marcas com paginação
 */
export const getBrandsService = async (): Promise<BrandListResponse> => {
    const response = await baseApi.get<BrandListResponse>('api/brands');
    return response.data;
};

/**
 * GET /api/brands/{id}
 * Obtém uma marca pelo ID
 */
export const getBrandByIdService = async (id: number): Promise<BrandResponse> => {
    const response = await baseApi.get<BrandResponse>(`api/brands/${id}`);
    return response.data;
};

/**
 * POST /api/brands
 * Cria uma nova marca
 */
export const createBrandService = async (brandData: Omit<Brand, 'id'>): Promise<BrandResponse> => {
    const response = await baseApi.post<BrandResponse>('api/brands', brandData);
    return response.data;
};

/**
 * PUT /api/brands/{id}
 * Atualiza uma marca existente
 */
export const updateBrandService = async (id: number, brandData: Partial<Brand>): Promise<BrandResponse> => {
    const response = await baseApi.put<BrandResponse>(`api/brands/${id}`, brandData);
    return response.data;
};

/**
 * DELETE /api/brands/{id}
 * Exclui uma marca pelo ID
 */
export const deleteBrandService = async (id: number): Promise<DeleteBrandResponse> => {
    const response = await baseApi.delete<DeleteBrandResponse>(`api/brands/${id}`);
    return response.data;
};