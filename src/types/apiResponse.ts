// src/types/apiTypes.ts

/**
 * Representa a estrutura de dados para respostas paginadas da API.
 * <T> é o tipo da entidade na lista (ex: Brand, Service, etc.).
 */
export type Page<T> = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  content: T[];
};

/**
 * Tipo genérico para respostas de API que contêm uma lista paginada.
 */
export type PagedApiResponse<T> = {
  status: number;
  message: string;
  data: Page<T>; // 'data' é obrigatório em respostas paginadas
  timestamp: string;
  path: string;
};

/**
 * Tipo genérico para respostas de API que contêm um único item ou nenhuma data.
 * <T> é o tipo do objeto de dados, se existir.
 */
export type ApiResponse<T> = {
  status: number;
  message: string;
  data?: T | null; // Opcional e pode ser nulo
  token?: string | null; // Opcional para autenticação
  timestamp: string;
  path: string;
};

/**
 * Representa a estrutura de dados retornada no campo 'data' de uma exclusão bem-sucedida.
 * <T> é o tipo da entidade que foi excluída.
 */
export type DeleteResult<T> = {
  result: T;
};