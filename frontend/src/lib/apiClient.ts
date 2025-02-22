export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: any;
}

const BASE_URL = process.env.API;

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

export const apiClient = async <T = any>(endpoint: string, method: RequestMethod, options: RequestOptions = {}): Promise<T> => {
  if (!BASE_URL) {
    throw new Error("API base URL is not defined in env.");
  }

  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  let computedBody: BodyInit | undefined;
  if (options.body) {
    computedBody = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    ...options,
    body: computedBody,
  };

  try {
    const response = await fetch(url, fetchOptions);
    return (await response.json()) as T;
  } catch (error) {
    console.error("apiClient error:", error);
    throw error;
  }
};

export const get = <T = any>(endpoint: string, options: RequestOptions = {}) => apiClient<T>(endpoint, "GET", options);

export const post = <T = any>(endpoint: string, data: any, options: RequestOptions = {}) =>
  apiClient<T>(endpoint, "POST", { ...options, body: data });

export const put = <T = any>(endpoint: string, data: any, options: RequestOptions = {}) => apiClient<T>(endpoint, "PUT", { ...options, body: data });

export const patch = <T = any>(endpoint: string, data: any, options: RequestOptions = {}) =>
  apiClient<T>(endpoint, "PATCH", { ...options, body: data });

export const del = <T = any>(endpoint: string, options: RequestOptions = {}) => apiClient<T>(endpoint, "DELETE", options);
