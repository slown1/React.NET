var webpack = require('webpack');
var path = require('path');
var Loadable = require('react-loadable/webpack');

const common = {
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [
		new Loadable.ReactLoadablePlugin({
			filename: './wwwroot/react-loadable.json',
		  }),
	],
	externals: {
		fs: 'commonjs fs',
		path: 'commonjs path',
	},
};

module.exports = [
	{
		...common,
		entry: {
			['server-polyfill']: './Content/components/server-polyfill.js',
			['components-bundle']:
				'./Content/components/expose-components.js',
		},
		output: {
			filename: 'server/[name].js',
			chunkFilename: 'server/[id].js',
			path: path.resolve(__dirname, './wwwroot'),
		},
		target: 'webworker',
	},
	{
		...common,
		entry: {
			['components-bundle']:
				'./Content/components/expose-components.js',
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[id].js',
			path: path.resolve(__dirname, './wwwroot'),
		},
		target: 'web',
	},
];
