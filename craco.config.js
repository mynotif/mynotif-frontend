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

      // Add CSS handling
      webpackConfig.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      });

      return webpackConfig;
    },
  },
  jest: {
    configure: {
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css'
      },
      transformIgnorePatterns: [
        'node_modules/(?!(lucide-react|react-datepicker)/)' 
      ],
      moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy'
      }
    }
  }
}