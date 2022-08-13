import App, { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "highlight.js/styles/tokyo-night-dark.css";
import "../styles/globals.css";
import "../styles/editorjs.css";
import "../styles/toastify.css";

function SnoopApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Snoopforms Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
// import { SessionProvider } from "next-auth/react";
// import { usePosthog } from "../lib/posthog";
// function SnoopAppWithAuth({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   // usePosthog();
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//       <ToastContainer />
//     </SessionProvider>
//   );
// }
// SnoopApp.getInitialProps = async (appContext: AppProps) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default SnoopApp;
