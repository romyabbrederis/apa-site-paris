import Head from "next/head";
import Menu from "../components/Menu";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <nav>
        <Menu />
      </nav>
      <main>{children}</main>
      <style jsx>
        {`
          main {
            min-height: 100%;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}
