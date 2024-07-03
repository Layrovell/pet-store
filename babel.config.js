module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo',
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      "module:metro-react-native-babel-preset",
      '@babel/preset-react',
    ],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          allowUndefined: false,
          verbose: false,
        },
      ],
    ],
  };
};
