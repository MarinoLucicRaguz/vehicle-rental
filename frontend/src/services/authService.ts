import { post } from "@/lib/apiClient";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ValidateResponse } from "@/types/AuthTypes";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return await post<LoginResponse>("/api/auth/login", data);
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return await post<RegisterResponse>("/api/auth/register", data);
  },

  async validate(token: string): Promise<ValidateResponse> {
    return await post<ValidateResponse>("/api/auth/validatetoken", JSON.stringify(token));
  },
};
