const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isDev ? '/' : './',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 144
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
      .set('utils', resolve('src/utils'))
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use(['pug-plain-loader'])
      .loader('pug-plain-loader')
      .end()
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule.exclude.add(resolve('src/assets/iconfont'))
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/icons/svg'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  devServer: {
    // disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
