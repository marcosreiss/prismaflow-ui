
import baseApi from './config/api';
import type { PagedApiResponse, ApiResponse, DeleteResult } from '@/types/apiResponse';
import type { Brand } from '@/types/brandTypes';


export const getBrandsService = async (params: {
    page: number;
    size: number;
    search?: string;
}): Promise<PagedApiResponse<Brand>> => {
    const response = await baseApi.get<PagedApiResponse<Brand>>('api/brands', { params });
    return response.data;
};


export const getBrandByIdService = async (id: number): Promise<ApiResponse<Brand>> => {
    const response = await baseApi.get<ApiResponse<Brand>>(`api/brands/${id}`);
    return response.data;
};


export const createBrandService = async (brandData: Omit<Brand, 'id'>): Promise<ApiResponse<Brand>> => {
    const response = await baseApi.post<ApiResponse<Brand>>('api/brands', brandData);
    return response.data;
};


export const updateBrandService = async (
    id: number,
    brandData: Partial<Brand>
): Promise<ApiResponse<Brand>> => {
    const response = await baseApi.put<ApiResponse<Brand>>(`api/brands/${id}`, brandData);
    return response.data;
};


export const deleteBrandService = async (id: number): Promise<ApiResponse<DeleteResult<Brand>>> => {
    const response = await baseApi.delete<ApiResponse<DeleteResult<Brand>>>(`api/brands/${id}`);
    return response.data;
};