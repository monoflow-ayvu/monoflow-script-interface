const path = require('path');
const fs = require('fs');
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require('brotli-webpack-plugin');

const projectRoot = path.resolve(path.dirname(require.main.filename));
const entryFile = path.resolve(projectRoot, 'src/index.ts');
const distDir = path.resolve(projectRoot, 'dist');

if (!fs.existsSync(entryFile)) {
  console.error('entry file not found: ', entryFile);
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

var babelOptions = {
  presets: [
    ['@babel/env', {
      targets: {
        // 'android 4.4'
        ie: 6,
      },
      bugfixes: true,
      spec: true,
      modules: false,
      debug: false,
      useBuiltIns: false,
    }],
  ],
  "plugins": [["@babel/plugin-transform-arrow-functions", { "spec": true }]]
};

module.exports = {
  entry: entryFile,
  target: ['es5'],
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true
            },
          }
        ]
        // exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: distDir,
    chunkFormat: 'commonjs',
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new CompressionPlugin(),
    new BrotliPlugin({
      // asset: '[path].br',
      // test: /\.(js|css|html|svg)$/,
      // threshold: 10240,
      // minRatio: 0.8
    })
  ]
};