var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';
var isWatching = process.env.WATCHING === '1';

var dest = {
  name: 'dev',
  root: './',
  rootPath: function() {
    return path.resolve(__dirname, this.root);
  },
  fullPath: function() {
    return path.resolve(__dirname, this.root + this.name);
  }
};

if (isProd) {
  dest.name =  'dist';
  dest.root = './';
}

var myConfig = {
  stats : 'minimal',
  devServer: {
    contentBase: dest.fullPath(),
    compress: true,
    port: 3002
  },

  entry : {
    app: './src/js/main.js',
    vendor: [
      'react', 
      'react-dom',  
      'react-transition-group',
      'prop-types'
    ]
  },

  output : {
    path: dest.fullPath(),
    filename: 'js/[name].[hash].js'
  },

  module: {
    rules: [
      {
        test: /.scss$/,
        exclude: [/fonts/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options : {url: false}
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader', 
        exclude: [/node_modules/] 
      }
    ]
  },

  plugins : [
    new CleanWebpackPlugin([dest.name] , {
      root: dest.rootPath(),
      verbose: true,
      dry: false
    }),
    
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // Specify the common bundle's name.
    }),
    
    new ExtractTextPlugin('css/app.css'),
    
    new webpack.LoaderOptionsPlugin({
      minimize: isProd
    }),

    new HtmlWebpackPlugin({
      template: './src/index.ejs'
    })
  ]

}

if (isProd) {
  myConfig.devtool = 'source-map';
  myConfig.plugins.push(
    // minify all JS
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  )
}

if (isWatching) {
  myConfig.watch = true;
  myConfig.watchOptions = {
    ignored: /node_modules/
  }
}

module.exports = myConfig;
