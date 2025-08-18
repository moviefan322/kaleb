// lib/http.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://kaleb-server-8c28c4b0fbfd.herokuapp.com";

export const API_BASE_LOCAL = "http://localhost:3001";

export async function rawFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API_BASE_LOCAL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });
  return res;
}
