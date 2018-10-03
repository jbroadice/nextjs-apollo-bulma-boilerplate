const path = require('path')
const withPlugins = require('next-compose-plugins')
const sass = require('@zeit/next-sass')
const bundleAnalyzer = require('@zeit/next-bundle-analyzer')
const transpileModules = require('@weco/next-plugin-transpile-modules')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

// next.js configuration
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '_variables.sass': path.resolve(__dirname, 'sass/_variables.scss')
    }

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )

    return config
  }
}


module.exports = withPlugins([

  // node-sass
  [sass, {}],

  // webpack-bundle-analyzer
  [bundleAnalyzer, {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }
  }],

  // Transpile untranspiled node_modules
  [transpileModules, {
    transpileModules: ['react-bulma-components', 'lodash-es']
  }]

], nextConfig)
