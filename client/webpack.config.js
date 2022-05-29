const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Added html webpack plugin which simplifies creation of HTML files to serve your webpack bundles.
    plugins: [
      new HtmlWebpackPlugin({
        template:'./index.html',
        title: 'text editor',
      }),
      // Added Inject Manifest which supports compiling a service worker file provided via swSrc, 
      // and injecting into that service worker a list of URLs and revision information for precaching based on the webpack asset pipeline.
      new InjectManifest({
        swSrc:'./src-sw.js',
        swDest:'src-sw.js',
      }),
      // Added Webpack-pwa-manifest that generates a 'manifest.json' for your Progressive Web Application, with auto icon resizing and fingerprinting support.
      new WebpackPwaManifest({
        name: 'Liz text editor',
        short_name: 'texteditor',
        description: 'Generates manifest for PWA',
        fingerprints: false,
        inject:true,
        background_color: '#F7E3DF',
        start_url:'/',
        publicPath: '/',
        icons:[
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
        ]
      })
      
    ],

    module: {
      rules: [
        {
          // Style-loader & css-loader
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
