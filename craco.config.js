module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "assert": require.resolve("assert")
      };

      webpackConfig.module.rules.push({
        test: /\/node_modules\/lucide-react\/.*/,
        use: 'babel-loader',
      });

      return webpackConfig;
    },
  },
  jest: {
    configure: {
      transformIgnorePatterns: [
        'node_modules/(?!(lucide-react)/)'
      ]
    }
  }
}