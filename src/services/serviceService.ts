// src/services/serviceService.ts

import baseApi from './config/api';
import type {
    Service,
    ServiceListResponse,
    ServiceResponse,
    DeleteServiceResponse,
} from '@/models/serviceModel';

export const getServicesService = async (): Promise<ServiceListResponse> => {
    const response = await baseApi.get<ServiceListResponse>('api/services');
    return response.data;
};

export const getServiceByIdService = async (id: number): Promise<ServiceResponse> => {
    const response = await baseApi.get<ServiceResponse>(`api/services/${id}`);
    return response.data;
};

export const createServiceService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<ServiceResponse> => {
    const response = await baseApi.post<ServiceResponse>('api/services', serviceData);
    return response.data;
};

export const updateServiceService = async (id: number, serviceData: Partial<Service>): Promise<ServiceResponse> => {
    const response = await baseApi.put<ServiceResponse>(`api/services/${id}`, serviceData);
    return response.data;
};

export const deleteServiceService = async (id: number): Promise<DeleteServiceResponse> => {
    const response = await baseApi.delete<DeleteServiceResponse>(`api/services/${id}`);
    return response.data;
};