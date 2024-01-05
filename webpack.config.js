// const path = require('path');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

// module.exports = {
//   entry: './src/index.tsx',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: {
//           loader: 'ts-loader',
//           options: {
//             configFile: 'tsconfig.json',
//           },
//         },
//         exclude: /node_modules/,
//       },
//       { test: /\.svg$/, use: ['file-loader'] },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//     modules: [path.resolve(__dirname, 'src'), 'node_modules'],
//     alias: {
//       assets: path.resolve(__dirname, 'src/assets'),
//     },
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'src'),
//     },
//     host: 'dev.gohigher.site',
//     port: 4000,
//   },
//   plugins: [new BrowserSyncPlugin({ port: 4000, proxy: 'http://dev.gohigher.site' }), new Dotenv()],
// };
