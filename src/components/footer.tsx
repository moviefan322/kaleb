export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <h1>FOOTER</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum deserunt
          natus id repellat maiores. Vel perspiciatis soluta hic tempora,
          quisquam, perferendis voluptate sed placeat porro debitis ad officiis
          voluptates fugiat.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum deserunt
          natus id repellat maiores. Vel perspiciatis soluta hic tempora,
          quisquam, perferendis voluptate sed placeat porro debitis ad officiis
          voluptates fugiat.
        </p>
      </div>

      {/* STYLESHEET */}
      <style jsx>{`
        .footer-container {
            padding-top: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            to bottom,
            #f6f1e9 0%,
            pink 30%
          );
          color: white;
          width: 100%;
        }
      `}</style>
    </>
  );
}
