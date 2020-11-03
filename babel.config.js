module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.web.js', '.tsx', 'ts', '.d.ts', '.android.tsx', '.ios.tsx'],
          alias: {
            '@components': './src/components'
          }
        }
      ]
    ]
  };
};
