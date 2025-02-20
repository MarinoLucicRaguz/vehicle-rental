import { post } from "@/lib/apiClient";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterRequest extends LoginRequest {}

interface RegisterResponse {
  message: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return await post<LoginResponse>("/api/auth/login", data);
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return await post<RegisterResponse>("/api/auth/register", data);
  },
};
