// src/hooks/useService.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
    getServicesService,
    getServiceByIdService,
    createServiceService,
    updateServiceService,
    deleteServiceService,
} from "@/services/serviceService";

import type { ApiResponse, PagedApiResponse, DeleteResult } from "@/types/apiResponse";
import type { Service } from "@/types/serviceTypes";

/**
 * Hook para buscar a lista paginada de serviços
 */
export const useGetServices = (params: { page: number; size: number; search?: string }) =>
    useQuery<PagedApiResponse<Service>, AxiosError>({
        // A queryKey agora inclui os parâmetros para que o cache funcione por página/busca
        queryKey: ["services", params.page, params.size, params.search],
        queryFn: () => getServicesService(params),
        // Mantém os dados da página anterior visíveis enquanto a nova carrega
        placeholderData: (prev) => prev,
    });

/**
 * Hook para buscar um único serviço pelo ID
 */
export const useGetServiceById = (id: number) =>
    useQuery<ApiResponse<Service>, AxiosError>({
        queryKey: ["service", id],
        queryFn: () => getServiceByIdService(id),
        enabled: !!id,
    });

/**
 * Hook para criar um novo serviço
 */
export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Service>, AxiosError, Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>({
        mutationFn: createServiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};

/**
 * Hook para atualizar um serviço
 */
export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Service>, AxiosError, { id: number; data: Partial<Service> }>({
        mutationFn: ({ id, data }) => updateServiceService(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            // Invalida o cache do item específico que foi atualizado
            if (response.data) {
                queryClient.invalidateQueries({ queryKey: ["service", response.data.id] });
            }
        },
    });
};

/**
 * Hook para excluir um serviço
 */
export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<DeleteResult<Service>>, AxiosError, number>({
        mutationFn: deleteServiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};