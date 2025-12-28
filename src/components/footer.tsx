import { useRouter } from "next/router";
import Instagram from "./instagram";

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <div className="footer-container">
        <h1>KALEB CLARK</h1>
        <ul>
          <li>
            <button onClick={() => router.push("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => router.push("/booking")}>Booking</button>
          </li>
          <li>
            <button onClick={() => router.push("/about")}>About</button>
          </li>
          <li>
            <button onClick={() => router.push("/shop")}>Shop</button>
          </li>
        </ul>
        <div className="socials">
          <button
            className="social"
            onClick={() =>
              window.open("https://www.instagram.com/katharsis365/", "_blank")
            }
          >
            <Instagram size={40} />
          </button>
        </div>
      </div>

      {/* STYLESHEET */}
      <style jsx>{`
        .footer-container {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(to bottom, var(--bg) 0%, var(--pink) 30%);
          color: white;
          min-width: 100vw;
        }
        .footer-container h1 {
          padding: 2rem 0rem;
        }
        .footer-container li {
          list-style: none;
          font-size: 24px;
          font-weight: 600;
          text-decoration: underline;
        }
        .socials {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .social {
          background: none;
          border: none;
          cursor: pointer;
          padding: 2rem 0rem;
        }
      `}</style>
    </>
  );
}
