import "normalize.css";
import { AppProps } from "next/app";
import "../../public/styles/global.css";
import Layout from "../components/Layout";
import { getLocale } from "../utils/localeChecker";
import Router from "next/router";
import * as gtag from "../lib/gtag";

Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
