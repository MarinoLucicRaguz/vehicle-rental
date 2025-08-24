export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: any;
}

const BASE_URL = process.env.SERVER_API_BASE_URL || process.env.NEXT_PUBLIC_SERVER_API_BASE_URL;

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

export const apiClient = async <T = any>(endpoint: string, method: RequestMethod = "GET", options: RequestOptions = {}): Promise<T> => {
  const headers: Record<string, string> = {
    ...defaultHeaders,
    ...((options.headers as Record<string, string>) ?? {}),
  };

  if (!BASE_URL) {
    throw new Error("API base URL is not defined in env.");
  }

  if (typeof window === "undefined") {
    try {
      const { getServerToken } = await import("./getServerToken");
      const token = await getServerToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      console.log("Issue while detecting client or serverside call.")
    }
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      credentials: "include",
      ...options,
      headers,
      body: options.body && method !== "GET" ? (typeof options.body === "string" ? options.body : JSON.stringify(options.body)) : undefined,
    });

    if (!res.ok) throw new Error(await res.text());
    const data = res.headers.get("content-type")?.includes("application/json") ? await res.json() : await res.text();

    return (data ?? {}) as T;
  } catch (err) {
    console.error("apiClient network error", err);
    throw err;
  }
};

export const get = <T = any>(endpoint: string, options: RequestOptions = {}) => apiClient<T>(endpoint, "GET", options);

export const post = <T = any>(endpoint: string, data: any, options: RequestOptions = {}) =>
  apiClient<T>(endpoint, "POST", { ...options, body: data });

export const put = <T = any>(endpoint: string, data: any, options: RequestOptions = {}) => apiClient<T>(endpoint, "PUT", { ...options, body: data });

export const patch = <T = any>(endpoint: string, data: any, options: RequestOptions = {}) =>
  apiClient<T>(endpoint, "PATCH", { ...options, body: data });

export const del = <T = any>(endpoint: string, options: RequestOptions = {}) => apiClient<T>(endpoint, "DELETE", options);
