// types/auth.ts
export type User = {
  id: string;
  email: string;
  name?: string;
  role?: "admin" | "user" | string;
  isEmailVerified?: boolean;
};

export type TokenPair = {
  token: string;        // JWT
  expires: string;      // ISO datetime
};

export type Tokens = {
  access: TokenPair;
  refresh: TokenPair;
};
