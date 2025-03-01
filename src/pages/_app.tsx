import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Layout from "@/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("isAdmin");
    setIsAdmin(storedAdmin === "true");
  }, []);

  const toggleAdmin = (val: boolean) => {
    setIsAdmin(val);
    localStorage.setItem("isAdmin", val.toString());
  };

  if (isAdmin === undefined) return <p>Loading...</p>;

  return (
    <Layout isAdmin={isAdmin} setIsAdmin={toggleAdmin}>
      <Component isAdmin={isAdmin} setIsAdmin={toggleAdmin} {...pageProps} />
    </Layout>
  );
}
