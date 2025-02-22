import { ServiceResponse } from "./serviceResponse";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
}

export type LoginResponse = ServiceResponse<LoginResponseData>;

export interface RegisterRequest extends LoginRequest {
  confirmPassword: string;
}

export interface RegisterResponseData {
  message: string;
}

export type RegisterResponse = ServiceResponse<RegisterResponseData>;

export interface ValidateResponseData {
  valid: boolean;
  claims?: any;
}

export type ValidateResponse = ServiceResponse<ValidateResponseData>;
