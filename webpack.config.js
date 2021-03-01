const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, '/public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}, {
			test: /\.s[ac]ss$/i,
			use: [ "style-loader", "css-loader", "sass-loader", 	],
		},{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: 'file-loader',
				},
			],
		}]
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true
	}
};