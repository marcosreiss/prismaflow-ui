// src/services/serviceService.ts

import baseApi from './config/api';
import type { ApiResponse, PagedApiResponse, DeleteResult } from '@/types/apiResponse';
import type { Service } from '@/types/serviceTypes';

/**
 * GET /api/services
 * Lista todos os serviços com paginação
 */
export const getServicesService = async (params: {
    page: number;
    size: number;
    search?: string;
}): Promise<PagedApiResponse<Service>> => {
    const response = await baseApi.get<PagedApiResponse<Service>>('api/services', { params });
    return response.data;
};

/**
 * GET /api/services/{id}
 * Obtém um serviço pelo ID
 */
export const getServiceByIdService = async (id: number): Promise<ApiResponse<Service>> => {
    const response = await baseApi.get<ApiResponse<Service>>(`api/services/${id}`);
    return response.data;
};

/**
 * POST /api/services
 * Cria um novo serviço
 */
export const createServiceService = async (
    serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Service>> => {
    const response = await baseApi.post<ApiResponse<Service>>('api/services', serviceData);
    return response.data;
};

/**
 * PUT /api/services/{id}
 * Atualiza um serviço existente
 */
export const updateServiceService = async (
    id: number,
    serviceData: Partial<Service>
): Promise<ApiResponse<Service>> => {
    const response = await baseApi.put<ApiResponse<Service>>(`api/services/${id}`, serviceData);
    return response.data;
};

/**
 * DELETE /api/services/{id}
 * Exclui um serviço pelo ID
 */
export const deleteServiceService = async (id: number): Promise<ApiResponse<DeleteResult<Service>>> => {
    const response = await baseApi.delete<ApiResponse<DeleteResult<Service>>>(`api/services/${id}`);
    return response.data;
};