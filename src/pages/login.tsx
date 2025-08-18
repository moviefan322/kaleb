"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { rawFetch } from "@/lib/http";
import { saveSession, clearSession, getRefreshToken } from "@/lib/session";
import type { User, Tokens } from "@/types/auth";

interface LoginProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Login({ isAdmin, setIsAdmin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await rawFetch("/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // server typically returns { code, message }
        const err = await res.json().catch(() => null);
        const msg = err?.message || `Login failed (${res.status})`;
        throw new Error(msg);
      }

      const { user, tokens } = (await res.json()) as {
        user: User;
        tokens: Tokens;
      };

      // persist
      saveSession(user, tokens);

      // infer admin from role (your payload has role:"user")
      setIsAdmin(user.email === "kaleb@kaleb.com");

      setMessage("Login successful");
      router.push("/");
    } catch (e: unknown) {
      const errorMessage =
        e && typeof e === "object" && "message" in e
          ? (e as { message?: string }).message
          : undefined;
      setMessage(`Error: ${errorMessage || "Unable to login"}`);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await rawFetch("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // swallow network errors on logout
    } finally {
      clearSession();
      setIsAdmin(false);
      setMessage("Logged out");
    }
  };

  if (isAdmin) {
    return (
      <div className="container">
        <h1>Already Logged In</h1>
        <button className="mainButton" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <h1>LOGIN</h1>

          <div className="login-section">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="mainButton" onClick={handleLogin}>
              Login
            </button>
          </div>

          {message && <p>{message}</p>}
        </div>

        {/*STYLESHEET*/}
        <style jsx>{`
          .login-section {
            margin: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          input {
            padding: 0.5rem;
            font-size: 1rem;
          }
          p {
            margin-top: 1rem;
            color: ${message.startsWith("Error") ? "red" : "green"};
          }
        `}</style>
      </>
    );
  }
}
