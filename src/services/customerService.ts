import baseApi from './config/api';
import type { ApiResponse, PagedApiResponse, DeleteResult } from '@/types/apiResponse';
import type { Customer } from '@/types/customerTypes';

/**
 * GET /api/customers
 * Lista todos os clientes com paginação.
 */
export const getCustomersService = async (params: {
    page: number;
    size: number;
    search?: string;
}): Promise<PagedApiResponse<Customer>> => {
    const response = await baseApi.get<PagedApiResponse<Customer>>('api/clients', { params });
    return response.data;
};

/**
 * GET /api/customers/{id}
 * Obtém um cliente pelo ID.
 */
export const getCustomerByIdService = async (id: number): Promise<ApiResponse<Customer>> => {
    const response = await baseApi.get<ApiResponse<Customer>>(`api/clients/${id}`);
    return response.data;
};

/**
 * POST /api/customers
 * Cria um novo cliente.
 */
export const createCustomerService = async (
    customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Customer>> => {
    const response = await baseApi.post<ApiResponse<Customer>>('api/clients', customerData);
    return response.data;
};

/**
 * PUT /api/customers/{id}
 * Atualiza um cliente existente.
 */
export const updateCustomerService = async (
    id: number,
    customerData: Partial<Customer>
): Promise<ApiResponse<Customer>> => {
    const response = await baseApi.put<ApiResponse<Customer>>(`api/clientes/${id}`, customerData);
    return response.data;
};

/**
 * DELETE /api/customers/{id}
 * Exclui um cliente pelo ID.
 */
export const deleteCustomerService = async (id: number): Promise<ApiResponse<DeleteResult<Customer>>> => {
    const response = await baseApi.delete<ApiResponse<DeleteResult<Customer>>>(`api/clients/${id}`);
    return response.data;
};