import { useRouter } from "next/router";

export default function Menu({ closeMenu }: { closeMenu: () => void }) {
  const router = useRouter();

  const navigateToPage = (page: string) => {
    router.push(page);
    closeMenu();
  };
  return (
    <div className="menu-screen">
      <ul>
        <li>
          <button onClick={() => navigateToPage("/")}>Home</button>
        </li>
        <li>
          <button onClick={() => navigateToPage("/thaimassage")}>Thai Massage</button>
        </li>
        <li>
          <button onClick={() => navigateToPage("/acupressure")}>Cupping/Acupressure</button>
        </li>
        <li>
          <button onClick={() => navigateToPage("/booking")}>Booking</button>
        </li>
        <li>
          <button onClick={() => navigateToPage("/about")}>About</button>
        </li>
        {/* <li>
          <button onClick={() => navigateToPage("/shop")}>Shop</button>
        </li> */}
      </ul>

      <style jsx>{`
        .menu-screen {
          position: fixed;
          top: 40vh;
          flex: 1;
          max-width: 100vw;
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
        }

        li button {
          font-size: 24px;
          color: var(--blues);
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-weight: inherit;
          transition: color 0.2s;
        }
        li button:hover {
          color: var(--pink);
        }
      `}</style>
    </div>
  );
}
