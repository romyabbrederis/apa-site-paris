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
      "https://residence.us20.list-manage.com/subscribe/post?u=0af91a880015cdd82808d3d5a&amp;id=e5f67db741",
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
