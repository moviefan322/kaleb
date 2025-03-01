"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/client";

interface LoginProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Login({ isAdmin, setIsAdmin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setIsAdmin(true);
      router.push("/");
      console.log("User Data:", data);
    }
  };

  if (isAdmin) {
    return (
      <div className="container">
        <h1>Already Logged In</h1>
        <button className="mainButton" onClick={() => setIsAdmin(false)}>
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
