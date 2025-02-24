export default function Menu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="menu-screen">
      <ul>
        <li>
          <a href="#" onClick={closeMenu}>
            Home
          </a>
        </li>
        <li>
          <a href="#" onClick={closeMenu}>
            About
          </a>
        </li>
        <li>
          <a href="#" onClick={closeMenu}>
            Services
          </a>
        </li>
        <li>
          <a href="#" onClick={closeMenu}>
            Contact
          </a>
        </li>
      </ul>

      <style jsx>{`
        .menu-screen {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          transition: opacity 0.3s ease-in-out;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin: 1rem 0;
          font-size: 24px;
        }

        a {
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
