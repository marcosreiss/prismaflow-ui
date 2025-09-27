import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
} from "@/services/productService";

import type { ApiResponse, PagedApiResponse, DeleteResult } from "@/types/apiResponse";
import type { Product } from "@/types/productTypes";

/**
 * Hook para buscar a lista paginada de produtos
 */
export const useGetProducts = (params: { page: number; size: number; search?: string }) =>
    useQuery<PagedApiResponse<Product>, AxiosError>({
        queryKey: ["products", params.page, params.size, params.search],
        queryFn: () => getProductsService(params),
        placeholderData: (prev) => prev,
    });

/**
 * Hook para buscar um único produto pelo ID
 */
export const useGetProductById = (id: number) =>
    useQuery<ApiResponse<Product>, AxiosError>({
        queryKey: ["product", id],
        queryFn: () => getProductByIdService(id),
        enabled: !!id, // A query só roda se o ID for válido
    });

/**
 * Hook para criar um novo produto
 */
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Product>, AxiosError, Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salePrice' | 'brand'>>({
        mutationFn: createProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

/**
 * Hook para atualizar um produto
 */
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Product>, AxiosError, { id: number; data: Partial<Product> }>({
        mutationFn: ({ id, data }) => updateProductService(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            if (response.data) {
                queryClient.invalidateQueries({ queryKey: ["product", response.data.id] });
            }
        },
    });
};

/**
 * Hook para excluir um produto
 */
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<DeleteResult<Product>>, AxiosError, number>({
        mutationFn: deleteProductService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};