const path = require('path'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: { main: './src/pages/index.js', },
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
    },

    devServer: {
      static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
      open: true // сайт будет открываться сам при запуске npm run dev
    },

    module: {
      rules:[
        { 
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename:'images/[name].[hash][ext]',
          }
        },
        {
          test: /\.(woff|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename:'fonts/[name].[hash][ext]',
          }
        },

        {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],

};