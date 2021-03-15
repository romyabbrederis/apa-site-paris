const withMdxEnhanced = require("next-mdx-enhanced");
const rehypePrism = require("@mapbox/rehype-prism");

module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',  
  },
}

module.exports = withMdxEnhanced({
  layoutPath: "src/layouts",
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  defaultLayout: true,
  rehypePlugins: [rehypePrism],
})({
  pageExtensions: ["mdx", "tsx"],
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
