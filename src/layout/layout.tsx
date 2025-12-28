import { useState, Suspense } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Menu from "../components/menu";

interface LayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Layout({ children, isAdmin, setIsAdmin }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (isAdmin === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <div
        className={`main-section content-wrapper ${
          menuOpen ? "fade-out" : "fade-in"
        }`}
      >
        {children}
        <Footer />
      </div>

      <div
        className={`main-section menu-wrapper ${
          menuOpen ? "fade-in" : "fade-out"
        }`}
      >
        <Menu closeMenu={() => setMenuOpen(false)} />
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        .main-section {
          flex: 1;
          padding-top: 75px;
          min-height: 100vh;
          min-width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.3s ease-in-out;
        }
        .content-wrapper,
        .menu-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        }

        /* Default state: Page content visible */
        .content-wrapper {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }

        /* When menu opens, fade out page content */
        .fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Default state: Menu hidden */
        .menu-wrapper {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Fade-in menu when active */
        .menu-wrapper.fade-in {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }
      `}</style>
    </Suspense>
  );
}
