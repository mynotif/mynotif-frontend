module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
      'node_modules/(?!(lucide-react)/)' 
    ],
    moduleNameMapper: {
      "^lucide-react$": "lucide-react"
    }
  }