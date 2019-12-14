import merge from 'webpack-merge'
import common from './webpack.common.js'
import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    https: true,
    watchContentBase: true,
    public: 'localhost:8081',
    host: '0.0.0.0',
  }
})