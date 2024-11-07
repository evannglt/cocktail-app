import AsyncStorage from "@react-native-async-storage/async-storage";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_URL || "http://localhost:8080";
  }

  private getFullUrl(
    endpoint: string,
    params?: Record<string, string>
  ): string {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, body, headers: customHeaders, ...otherOptions } = options;
    const url = this.getFullUrl(endpoint, params);

    const headers = new Headers(customHeaders);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...otherOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  public async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, options);
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("POST", endpoint, { ...options, body: data });
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, { ...options, body: data });
  }

  public async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, options);
  }

  public async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, { ...options, body: data });
  }

  public async setAuthToken(token: string): Promise<void> {
    await AsyncStorage.setItem("authToken", token);
  }

  public async getAuthToken(): Promise<string | null> {
    return AsyncStorage.getItem("authToken");
  }

  public async clearAuthToken(): Promise<void> {
    await AsyncStorage.removeItem("authToken");
  }
}

const api = new Api();
export default api;
