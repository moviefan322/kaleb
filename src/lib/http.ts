// lib/http.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export async function rawFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });
  return res;
}
