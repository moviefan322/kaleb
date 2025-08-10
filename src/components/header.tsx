"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { clearSession } from "@/lib/session";

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
  menuOpen: boolean;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Header({
  setMenuOpen,
  menuOpen,
  isAdmin,
  setIsAdmin,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    clearSession();
    setIsAdmin(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className={`container ${scrolled ? "scrolled" : ""}`}>
        <div className="text-section">
          <p className="kaleb">Kaleb Clark</p>
          <p className="sub">MERIDIAN YOGA + BODY WORK</p>
        </div>
        {isAdmin && (
          <div className="flex-column">
            <p className="admin-text">Admin Mode</p>
            <button className="mainButton" onClick={handleLogout}>
              End Session
            </button>
          </div>
        )}
        <div className="menuButton">
          <button onClick={handleMenuClick} className="icon-button">
            <div className={`icon ${menuOpen ? "fade-out" : "fade-in"}`}>
              <Menu size={32} />
            </div>
            <div className={`icon ${menuOpen ? "fade-in" : "fade-out"}`}>
              <X size={32} />
            </div>
          </button>
        </div>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          width: 100%;
          max-width: 100vw;
          height: 75px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          z-index: 2;
          background: transparent;
          transition: background-color 0.6s ease-in-out;
        }
        .container.scrolled {
          background: var(--bg);
          backdrop-filter: blur(10px);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .text-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .kaleb {
          font-size: 32px;
          font-weight: 700;
        }
        .sub {
          font-size: 12px;
          font-weight: 400;
        }
        .icon-button {
          position: relative;
          width: 32px;
          height: 32px;
        }
        .icon {
          position: absolute;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .fade-in {
          opacity: 1;
          transform: scale(1);
        }
        .fade-out {
          opacity: 0;
          transform: scale(0.8);
        }
        .flex-column {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
        }
        .mainButton {
          padding: 0.2rem 0.3rem;
        }
        .admin-text {
          font-size: 16px;
          color: white;
          font-family: "Monospace";
          background: green;
          padding: 0.2rem 0.3rem;
        }
      `}</style>
    </>
  );
}
