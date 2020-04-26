import path from 'path'
import { EnvironmentPlugin } from 'webpack'

export default {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
      COMMIT_REF: process.env.COMMIT_REF || 'xxxxx'
    })
  ]
}