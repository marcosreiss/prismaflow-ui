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
import type {
    Service,
    ServiceListResponse,
    ServiceResponse,
    DeleteServiceResponse,
} from "@/models/serviceModel";

export const useGetServices = () =>
    useQuery<ServiceListResponse, AxiosError>({
        queryKey: ["services"],
        queryFn: getServicesService,
    });

export const useGetServiceById = (id: number) =>
    useQuery<ServiceResponse, AxiosError>({
        queryKey: ["service", id],
        queryFn: () => getServiceByIdService(id),
        enabled: !!id,
    });

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation<ServiceResponse, AxiosError, Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>({
        mutationFn: createServiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();
    return useMutation<ServiceResponse, AxiosError, { id: number; data: Partial<Service> }>({
        mutationFn: ({ id, data }) => updateServiceService(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            queryClient.invalidateQueries({ queryKey: ["service", data.data.id] });
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteServiceResponse, AxiosError, number>({
        mutationFn: deleteServiceService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};