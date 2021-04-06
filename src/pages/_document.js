import { Fragment } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const isProduction = process.env.NODE_ENV === "production";

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}
        gtag("js", new Date());
        gtag("config", "${GA_TRACKING_ID}");
    `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
