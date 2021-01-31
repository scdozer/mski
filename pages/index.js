import Head from "next/head";

import dynamic from "next/dynamic";

const HomeCanvas = dynamic(() => import("../components/HomeCanvas"));

export default function Home() {
  return (
    <>
      <div className="container">
        <Head>
          <title>matt mileski</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Matt Milewski</h1>
          <p>me@mattmilewski.com</p>
        </main>
        <style jsx>{`
          main {
            position: fixed;
            // width: 100vw;
            // height: 100vh;
            // min-height: 100vh;
            bottom: 20px;
            left: 0;
            z-index: 100;
            text-align: center;
            width: 100%;
          }
          h1 {
            color: white;
            mix-blend-mode: difference;
            font-size: 80px;
          }
          p,
          a {
            color: white;
            font-size: 25px;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            background: black;
          }

          canvas {
            height: 100vh;
            width: 100vw;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
        <HomeCanvas />
      </div>
    </>
  );
}
