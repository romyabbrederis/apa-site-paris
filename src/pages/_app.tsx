import "normalize.css";
import { AppProps } from "next/app";
import "../../public/styles/global.css";
import Layout from "../components/Layout";
import { getLocale } from "../utils/localeChecker";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
