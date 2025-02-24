import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Kaleb Clark Yoga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="index-container">
        <h1>SAMPLE CONTENT</h1>
      </div>

      {/* STYLESHEET */}
      <style jsx>{`
        .index-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
        h1 {
          color: blue;
          text-align: center;
        }
      `}</style>
    </>
  );
}
