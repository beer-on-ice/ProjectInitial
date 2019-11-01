import routes from './routes.config'

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  [
    'umi-plugin-react',
    {
      dva: true,
      antd: true,
      locale: {
        default: 'zh-CN',
        baseNavigator: true,
        antd: true
      },
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//
        ]
      }
    }
  ]
]
export default {
  routes,
  plugins,
  publicPath: isDev ? '/' : './',
  history: 'hash',
  exportStatic: true,
  cssLoaderOptions: {
    localIdentName: '[local]'
  },
  alias: {
    components: path.resolve(__dirname, './../src/components'),
    utils: path.resolve(__dirname, './../src/utils'),
    services: path.resolve(__dirname, './../src/services'),
    models: path.resolve(__dirname, './../src/models'),
    assets: path.resolve(__dirname, './../src/assets')
  }
}
