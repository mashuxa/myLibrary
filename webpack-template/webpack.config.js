const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const SpriteLoaderPlugin=require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');


module.exports=(env, argv) => {
	let isDev = argv.mode === 'development';
	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, './build-output'),
			filename: './js/app.js'
		},
		devtool: isDev ? 'eval-source-map' : false,
		devServer: {
			overlay: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: '/node_modules/',
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'env',
								'stage-3'
							]
						}
					}
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')({
									'browsers': ['> 1%', 'last 2 versions']
								})]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				},
				{
					test: /\.(png|jp(e*)g)$/,
					use: [{
						loader: 'url-loader',
						options: {
							name: './assets/[hash]-[name].[ext]',
							publicPath: '../'
						}
					}]
				}
				, {
					test: /\.svg$/,
					use: [
						{
							loader: 'svg-sprite-loader', options: {
								extract: true,
								spriteFilename: 'build-output/assets/sprite.svg',
								runtimeCompat: true
							}
						},
						'svg-fill-loader',
						'svgo-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: './css/style.css'
			}),
			new SpriteLoaderPlugin({
				plainSprite: true
			}),
			new HtmlWebpackPlugin()
		]
	};
};