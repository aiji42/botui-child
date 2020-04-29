import path from 'path'
import { EnvironmentPlugin } from 'webpack'

export default {
  entry: [
    path.resolve(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
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