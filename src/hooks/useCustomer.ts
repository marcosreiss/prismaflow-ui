import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
    getCustomersService,
    getCustomerByIdService,
    createCustomerService,
    updateCustomerService,
    deleteCustomerService,
} from "@/services/customerService";

import type { ApiResponse, PagedApiResponse, DeleteResult } from "@/types/apiResponse";
import type { Customer } from "@/types/customerTypes";

/**
 * Hook para buscar a lista paginada de clientes.
 */
export const useGetCustomers = (params: { page: number; size: number; search?: string }) =>
    useQuery<PagedApiResponse<Customer>, AxiosError>({
        queryKey: ["customers", params.page, params.size, params.search],
        queryFn: () => getCustomersService(params),
        placeholderData: (prev) => prev,
    });

/**
 * Hook para buscar um único cliente pelo ID.
 */
export const useGetCustomerById = (id: number) =>
    useQuery<ApiResponse<Customer>, AxiosError>({
        queryKey: ["customer", id],
        queryFn: () => getCustomerByIdService(id),
        enabled: !!id,
    });

/**
 * Hook para criar um novo cliente.
 */
export const useCreateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Customer>, AxiosError, Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>({
        mutationFn: createCustomerService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        },
    });
};

/**
 * Hook para atualizar um cliente.
 */
export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Customer>, AxiosError, { id: number; data: Partial<Customer> }>({
        mutationFn: ({ id, data }) => updateCustomerService(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            if (response.data) {
                queryClient.invalidateQueries({ queryKey: ["customer", response.data.id] });
            }
        },
    });
};

/**
 * Hook para excluir um cliente.
 */
export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<DeleteResult<Customer>>, AxiosError, number>({
        mutationFn: deleteCustomerService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        },
    });
};