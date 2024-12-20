const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve('src/popup/index.tsx'),
    background: path.resolve('src/background/index.ts'),
    contentScript: path.resolve('src/contentScript/index.ts'),
    script: path.resolve('src/contentScript/script.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve('src/manifest.json'), 
          to: path.resolve('dist') 
        },
      ],
    }),
    new HtmlPlugin({
      template: path.resolve('src/popup/index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}; 