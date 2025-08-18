// lib/api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken } from "./session";

// If you already have this somewhere, import it instead:
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001/v1";

/**
 * Create an axios instance
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  // withCredentials: false, // enable if your API uses cookies
});

/**
 * Attach access token on every request (if present)
 */
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    // Do NOT overwrite Authorization if caller set something custom
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

/**
 * Refresh token logic (single-flight + queued retries)
 */
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

async function runRefresh(): Promise<void> {
  isRefreshing = true;
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    // hit your refresh endpoint
    const resp = await axios.post(`${API_BASE}/auth/refresh-tokens`, {
      refreshToken,
    });

    // Expecting { access: { token, expires }, refresh: { token, expires } }
    const tokens = resp.data?.tokens || resp.data;
    if (!tokens?.access?.token || !tokens?.refresh?.token) {
      throw new Error("Malformed refresh response");
    }

    // Update only tokens in localStorage (keep the user as-is)
    localStorage.setItem("auth_access", JSON.stringify(tokens.access));
    localStorage.setItem("auth_refresh", JSON.stringify(tokens.refresh));
  } finally {
    isRefreshing = false;
  }
}

/**
 * Response interceptor:
 * - If 401, try to refresh once, then retry original request.
 * - If refresh fails, clear session-like storage and reject.
 */
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const status = error.response?.status;

    // Only handle 401s for requests that haven't retried yet
    if (status === 401 && original && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        try {
          await runRefresh();
          // Resolve waiting queue
          refreshQueue.forEach((p) => p.resolve());
          refreshQueue = [];
        } catch (e) {
          // Propagate failure to the queue
          refreshQueue.forEach((p) => p.reject(e));
          refreshQueue = [];
          // optional: clear all session data (you have clearSession())
          // clearSession();
          return Promise.reject(error);
        }
      } else {
        // Wait for the ongoing refresh
        await new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        });
      }

      // Re-attach the (new) token and retry
      const newToken = getAccessToken();
      if (newToken) {
        original.headers = original.headers ?? {};
        original.headers["Authorization"] = `Bearer ${newToken}`;
      }
      return api(original);
    }

    // Not a handled 401 → bubble up
    return Promise.reject(error);
  }
);

export default api;

/**
 * Lightweight helpers if you like the old rawFetch ergonomics
 */
export async function apiGet<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
) {
  const res = await api.get<T>(path, config);
  return res.data;
}
export async function apiPost<T = unknown>(
  path: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  const res = await api.post<T>(path, data, config);
  return res.data;
}
export async function apiPatch<T = unknown>(
  path: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  const res = await api.patch<T>(path, data, config);
  return res.data;
}
export async function apiDelete<T = unknown>(
  path: string,
  config?: AxiosRequestConfig
) {
  const res = await api.delete<T>(path, config);
  return res.data;
}
