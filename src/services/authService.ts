import type { GetTokenPayload, LoginPayload, LoginResponse, TokenResponse } from "@/models/authModel";
import api from "./config/api";

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
    payload.idSistema = 2;
    payload.idUsuario = 0;
    payload.empresa = "3";

    const respose = await api.post<LoginResponse>("api/Token/ValidarLogin", payload);
    return respose.data;
}

export const generateTokenService = async (payload: GetTokenPayload) : Promise<TokenResponse> => {
    payload.idSistema = "2";
    payload.idUsuario = "0";
    payload.perfil = "";
    payload.estado = "";

    const response = await api.post<TokenResponse>("api/Token/Auth", payload);
    return response.data;
}