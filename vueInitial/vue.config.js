// const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const SpritesmithPlugin = require('webpack-spritesmith')
// const AliOssPlugin = require('webpack-oss')

const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  // 输出文件目录
  publicPath: IS_PROD ? './' : '/',
  // 'dist', 生产环境构建文件的目录
  outputDir: process.env.outputDir || 'dist',
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: '',
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@$', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@pages', resolve('src/pages'))
      .set('@utils', resolve('src/utils'))
      .set('@config', resolve('src/config'))
      .set('@scss', resolve('src/assets/scss'))
      .set('@layouts', resolve('src/layouts'))

    // 处理模板
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use(['pug-plain-loader'])
      .loader('pug-plain-loader')
      .end()

    return config
  },
  css: {
    loaderOptions: {
      stylus: {
        import: '~@/assets/styles/index.styl'
      }
    }
  },
  transpileDependencies: [],
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: !IS_PROD,
  pwa: {},
  devServer: {
    open: true, // 是否打开浏览器
    https: false,
    hotOnly: true, // 热更新
    host: 'localhost',
    port: '8080' // 代理端口
    // proxy: {
    //   "/api": {
    //     target: "http://www.baidu.com/",
    //     // 开启代理，在本地创建一个虚拟服务端
    //     changeOrigin: true,
    //     // 是否启用websockets
    //     // ws: true,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // }
  }
}
