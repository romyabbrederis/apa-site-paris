const withMdxEnhanced = require("next-mdx-enhanced");
const rehypePrism = require("@mapbox/rehype-prism");

module.exports = withMdxEnhanced({
  layoutPath: "src/layouts",
  defaultLayout: true,
  rehypePlugins: [rehypePrism],
})({
  pageExtensions: ["mdx", "tsx"],
  // i18n: {
  //   defaultLocale: "fr",
  //   locales: ["fr"],
  // },
  env: {
    mailchimp:
      "https://pourlartpourlafrique.us1.list-manage.com/subscribe/post?u=85857b8192b877efb5dc13e94&amp;id=f7e11bfb3e",
    REACT_APP_GOOGLE_ID: "G-HHXE2TT0PF",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
});
