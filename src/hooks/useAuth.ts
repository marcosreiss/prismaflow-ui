// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from "@/types/auth";
import { loginService, registerService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook para autenticação (login) do usuário
 */
export const useLogin = () => {
  const { setToken } = useAuth();

  return useMutation<UserLoginResponse, AxiosError, UserLoginRequest>({
    mutationFn: (payload) => loginService(payload),
    onSuccess: (data) => {
      console.log("Login efetuado com sucesso:", data);

      if (data.token && data.data) {
        setToken(data.token, {
          username: data.data.username,
          role: data.data.role,
        });
      }
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error);
    },
  });
};

/**
 * Hook para registro de novo usuário
 */
export const useRegister = () => {
  return useMutation<UserRegisterResponse, AxiosError, UserRegisterRequest>({
    mutationFn: (payload) => registerService(payload),
    onSuccess: (data) => {
      console.log("Usuário registrado com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro ao registrar usuário:", error);
    },
  });
};
