const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

const pages = require('./pages.js');

module.exports = (env, argv) => {
  let isDev = false;
  if (argv) {
    isDev = argv.mode === 'development';
  }
  const config = {
    entry: {},
    output: {
      path: path.resolve(__dirname, './build-output'),
      filename: 'js/[name].js',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    devtool: isDev ? 'eval-source-map' : false,
    devServer: {
      overlay: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  'env',
                  'stage-3',
                ],
              },
            },
            {
              loader: 'eslint-loader',
              options: {
                emitError: true,
                emitWarning: true,
                failOnError: true,
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: '/node_modules/',
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  AutoPrefixer(),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jp(e*)g)$/,
          exclude: '/node_modules/',
          loader: 'file-loader',
          options: {
            name: 'assets/[name]-[hash].[ext]',
            publicPath: '../',
          },
        },
        {
          test: /\.svg$/,
          exclude: '/node_modules/',
          include: path.resolve(__dirname, 'src/assets/svg'),
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/sprite.svg',
                runtimeCompat: true,
              },
            },
            'svg-fill-loader',
            'svgo-loader',
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              interpolate: true,
            },
          },
        },
        {
          test: /\.(woff(2)?)$/,
          include: path.resolve(__dirname, 'src/assets/fonts'),
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: url => `../fonts/${url}`,
            },
          }],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['./build-output']),
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, 'src/assets/png'),
          glob: '*.png',
        },
        target: {
          image: path.resolve(__dirname, 'build-output/assets/sprite.png'),
          css: path.resolve(__dirname, 'build-output/css/sprite.css'),
        },
        apiOptions: {
          cssImageRef: '../assets/sprite.png',
        },
      }),
      new StyleLintPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
    ],
  };

  pages.forEach((page) => {
    config.entry[page.chunksName] = path.resolve(__dirname, page.chunksSrc);
    const htmlCongig = new HtmlWebpackPlugin({
      cache: false,
      title: page.title,
      filename: page.distUrl,
      template: page.srcUrl,
      chunks: [page.chunksName],
      inject: true,
    });
    config.plugins.push(htmlCongig);
  });

  return config;
};
