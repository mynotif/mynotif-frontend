module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.css$': 'jest-transform-css'
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-datepicker)/)' 
    ],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    }
  }