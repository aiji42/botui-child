import merge from 'webpack-merge'
import common from './webpack.common.js'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyFilePlugin from 'copy-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'

export default merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new CopyFilePlugin(
      [
        {
          context: 'public',
          from: '_headers',
          to: path.resolve(__dirname, 'build')
        }
      ],
      { copyUnmodified: true }
    ),
    new WriteFilePlugin()
  ],
})