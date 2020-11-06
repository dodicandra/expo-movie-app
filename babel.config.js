module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.web.js', '.tsx', '.ts', '.d.ts', '.android.tsx', '.ios.tsx'],
          alias: {
            '@components': './src/components',
            '@config': './src/config',
            '@api': './src/api',
            '@screen': './src/screen',
            typed: './src/types',
            '@router': './src/routes',
            '@utils': './src/utils',
            '@hooks': './src/hooks'
          }
        }
      ]
    ]
  };
};
