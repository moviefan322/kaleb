// lib/session.ts
import type { Tokens, User } from "@/types/auth";

const KEYS = {
  user: "auth_user",
  access: "auth_access",
  refresh: "auth_refresh",
} as const;

export function saveSession(user: User, tokens: Tokens) {
  localStorage.setItem(KEYS.user, JSON.stringify(user));
  localStorage.setItem(KEYS.access, JSON.stringify(tokens.access));
  localStorage.setItem(KEYS.refresh, JSON.stringify(tokens.refresh));
}

export function clearSession() {
  localStorage.removeItem(KEYS.user);
  localStorage.removeItem(KEYS.access);
  localStorage.removeItem(KEYS.refresh);
}

export function getAccessToken(): string | null {
  try {
    const raw = localStorage.getItem(KEYS.access);
    if (!raw) return null;
    const a = JSON.parse(raw) as Tokens["access"];
    return a?.token || null;
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    const raw = localStorage.getItem(KEYS.refresh);
    if (!raw) return null;
    const r = JSON.parse(raw) as Tokens["refresh"];
    return r?.token || null;
  } catch {
    return null;
  }
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(KEYS.user);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  const user = getStoredUser();
  if (user && user.email === "kaleb@kaleb.com") {
    return true;
  }
  return false;
}
