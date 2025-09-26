// src/models/serviceModel.ts

// A entidade Service com o campo "id"
export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    cost: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Interface genérica para a estrutura de paginação da API
export interface Page<T> {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    content: T[];
}

// Resposta da API para a lista de serviços (com paginação)
export interface ServiceListResponse {
    status: number;
    message: string;
    data: Page<Service>;
    timestamp: string;
    path: string;
}

// Resposta da API para um único serviço (getById, create, update)
export interface ServiceResponse {
    status: number;
    message: string;
    data: Service;
    timestamp: string;
    path: string;
}

// Estrutura para a resposta de exclusão
export interface DeleteServiceResult {
    result: Service;
}

export interface DeleteServiceResponse {
    status: number;
    message: string;
    data: DeleteServiceResult;
    timestamp: string;
    path: string;
}