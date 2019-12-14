import merge from 'webpack-merge'
import common from './webpack.common.js'
import path from 'path'

export default merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  }
})