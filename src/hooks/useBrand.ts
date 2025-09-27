// 1. Importe o 'keepPreviousData' da biblioteca
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
    getBrandsService,
    getBrandByIdService,
    createBrandService,
    updateBrandService,
    deleteBrandService,
} from "@/services/brandService";

import type { PagedApiResponse, ApiResponse, DeleteResult } from "@/types/apiResponse";
import type { Brand } from "@/types/brandTypes";

/**
 * Hook para buscar a lista paginada de marcas
 */
export const useGetBrands = (params: { page: number; size: number; search?: string }) =>
    useQuery<PagedApiResponse<Brand>, AxiosError>({
        queryKey: ["brands", params.page, params.size, params.search],
        queryFn: () => getBrandsService(params),
        // 2. Troque 'keepPreviousData' por 'placeholderData'
        placeholderData: keepPreviousData,
    });

// ... o resto dos hooks (getById, create, update, delete) permanece igual ...
// A alteração é apenas nos hooks que usam paginação.

/**
 * Hook para buscar uma única marca pelo ID
 */
export const useGetBrandById = (id: number) =>
    useQuery<ApiResponse<Brand>, AxiosError>({
        queryKey: ["brand", id],
        queryFn: () => getBrandByIdService(id),
        enabled: !!id,
    });

/**
 * Hook para criar uma nova marca
 */
export const useCreateBrand = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Brand>, AxiosError, Omit<Brand, 'id'>>({
        mutationFn: createBrandService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
    });
};

/**
 * Hook para atualizar uma marca
 */
export const useUpdateBrand = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Brand>, AxiosError, { id: number; data: Partial<Brand> }>({
        mutationFn: ({ id, data }) => updateBrandService(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["brands"] });
            if (response.data) {
                queryClient.invalidateQueries({ queryKey: ["brand", response.data.id] });
            }
        },
    });
};

/**
 * Hook para excluir uma marca
 */
export const useDeleteBrand = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<DeleteResult<Brand>>, AxiosError, number>({
        mutationFn: deleteBrandService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
    });
};