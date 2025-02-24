import { useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
  menuOpen: boolean;
}

export default function Header({ setMenuOpen, menuOpen }: HeaderProps) {
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <>
      <div className="container">
        <div className="text-section">
          <p className="kaleb">Kaleb Clark</p>
          <p className="sub">MERIDIAN YOGA + BODY WORK</p>
        </div>
        <div className="menuButton">
          <button onClick={handleMenuClick}>
            <button onClick={handleMenuClick} className="icon-button">
              <div className={`icon ${menuOpen ? "fade-out" : "fade-in"}`}>
                <Menu size={32} />
              </div>
              <div className={`icon ${menuOpen ? "fade-in" : "fade-out"}`}>
                <X size={32} />
              </div>
            </button>
          </button>
        </div>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          width: 100%;
          height: 75px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          z-index: 2;
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
      `}</style>
    </>
  );
}
