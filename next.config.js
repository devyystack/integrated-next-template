const path = require('path');
const withImages = require('next-images');

// module.exports = withImages();÷

const resourcesConfig = {
  loader: 'sass-resources-loader',
  options: {
    sourceMap: true,
    resources: [path.resolve(__dirname, 'styles', 'variables.scss')],
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  org: 'lets-build',
  project: 'laina-rauma-lingerie',
  silent: true, // Suppresses all logs
  dryRun: process.env.VERCEL_ENV !== 'production',
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withImages({
  experimental: {
    scrollRestoration: true,
  },
  env: {
    siteTitle: 'Laina Rauma Lingerie',
    siteDescription: '',
    siteKeywords: '',
    siteUrl: 'https://www.lainaraumalingerie.com',
    siteImagePreviewUrl: '',
    twitterHandle: '@lainarauma',
  },
  images: {
    domains: ['cdn.shopify.com', 'images.prismic.io'],
    disableStaticImages: true,
  },
  webpack: (config, options) => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.alias['@utils'] = path.resolve(__dirname + '/utils');
    config.resolve.alias['@images'] = path.resolve(__dirname + '/images');
    config.resolve.alias['@scss'] = path.resolve(__dirname + '/styles');
    config.resolve.alias['@context'] = path.resolve(__dirname + '/context');
    config.resolve.alias['@components'] = path.resolve(
      __dirname + '/components'
    );
    config.resolve.alias['@helpers'] = path.resolve(__dirname + '/helpers');

    // Add specific rule for svg

    // Modify loaders
    for (let i = config.module.rules.length - 1; i > -1; i--) {
      const rule = config.module.rules[i];

      if (rule.oneOf) {
        for (let j = 0; j < rule.oneOf.length; j++) {
          const inner = rule.oneOf[j];
          // Add scss resources
          if (String(inner.test).indexOf('scss') > -1) {
            if (Array.isArray(inner.use)) {
              inner.use.push(resourcesConfig);
            }
          }
          // Remove .svg from using url-loader
          if (String(rule.test).indexOf('|svg|') > -1) {
            rule.test = /.(jpg|jpeg|png|gif|ico|webp|jp2|avif)$/;
          }
        }
      }
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
