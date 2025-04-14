import { ServiceResponse } from "./ServiceResponse";

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = ServiceResponse<string>;

export interface RegisterRequest extends LoginRequest {
  confirmPassword: string;
}

export interface RegisterResponseData {
  message: string;
}

export type RegisterResponse = ServiceResponse<RegisterResponseData>;

export interface ValidateResponseData {
  Id: number;
  Username: string;
  Role: string;
}

export type ValidateResponse = ServiceResponse<ValidateResponseData>;
