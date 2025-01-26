module.exports = {
  webpack: {
      configure: {
        resolve: {
          fallback: {
            "assert": require.resolve("assert"),
          },
        },
      },
    },
}
