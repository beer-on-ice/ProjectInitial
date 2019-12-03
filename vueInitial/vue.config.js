// const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const glob = require('glob-all')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const PurgecssPlugin = require('purgecss-webpack-plugin')
// const SpritesmithPlugin = require('webpack-spritesmith')
// const AliOssPlugin = require('webpack-oss')

const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  // 输出文件目录
  publicPath: IS_PROD ? './' : '/',
  // 'dist', 生产环境构建文件的目录
  outputDir: process.env.outputDir || 'dist',
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: '',
  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      // 去除consle
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      )

      // 利用splitChunks单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            elementUI: {
              name: 'chunk-elementUI',
              priority: 20,
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              chunks: 'all'
            }
          }
        }
      }

      // gzip
      plugins.push(
        new CompressionWebpackPlugin({
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          algorithm (input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback)
          },
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.99
        })
      )
      // zopfli
      plugins.push(
        new BrotliPlugin({
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          minRatio: 0.99
        })
      )

      // 去除多余css，可能会有样式丢失
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([resolve('./**/*.vue')]),
          extractors: [
            {
              extractor: class Extractor {
                static extract (content) {
                  const validSection = content.replace(
                    /<style([\s\S]*?)<\/style>+/gim,
                    ''
                  )
                  return validSection.match(/[A-Za-z0-9-_:/]+/g) || []
                }
              },
              extensions: ['html', 'vue']
            }
          ],
          whitelist: ['html', 'body'],
          whitelistPatterns: [/el-.*/],
          whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
        })
      )

      /*
       * 预渲染
       * 需要修改 routes/index.js 的 mode 为 history
       *  在下方 routes: [] 里加入需要预渲染的
       */
      plugins.push(
        new PrerenderSpaPlugin({
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动
          staticDir: resolve('dist'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ['/about'],
          postProcess (ctx) {
            ctx.route = ctx.originalRoute
            ctx.html = ctx.html.split(/>[\s]+</gim).join('><')
            if (ctx.route.endsWith('.html')) {
              ctx.outputPath = path.join(__dirname, 'dist', ctx.route)
            }
            return ctx
          },
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          }
          // renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
          //   // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
          //   inject: {
          //     foo: 'bar'
          //   },
          //   headless: false,
          //   // 视图组件是在API请求获取所有必要数据后呈现的，因此我们在dom中存在“data view”属性后创建页面快照
          //   renderAfterDocumentEvent: 'render-event'
          //   // renderAfterTime: 5000,
          //   // renderAfterElementExists: 'my-app-element'
          // })
        })
      )
    }

    // cdn - 使用cdn文件
    // config.externals = {
    //   vue: 'Vue',
    //   vuex: 'Vuex',
    //   'vue-router': 'VueRouter',
    //   axios: 'axios'
    // }

    config.plugins = [...config.plugins, ...plugins]
    config.performance = {
      // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
      hints: 'warning',
      // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
      maxEntrypointSize: 5000000,
      // 最大单个资源体积，默认250000 (bytes)
      maxAssetSize: 3000000
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 删除momentJs中语言包
    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )
    config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())

    // cdn - html中添加
    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
    //   js: [
    //     '//unpkg.com/vue@2.6.10/dist/vue.min.js',
    //     '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
    //     '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    //     '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    //     '//unpkg.com/element-ui@2.10.1/lib/index.js'
    //   ]
    // }
    // config.plugin('html').tap(args => {
    //   args[0].cdn = cdn
    //   return args
    // })

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

    // 处理svg
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

    // 压缩图片
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/imgs/svg'))
    imagesRule
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: '65-90', speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    if (IS_PROD) {
      config.optimization.delete('splitChunks')
    }
    return config
  },
  // css相关配置
  css: {
    modules: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      css: {},
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        data: `
        @import "@scss/global.scss";
        @import "@scss/reset.scss";
        @import "@scss/variables.scss";
        @import "@scss/util.scss";
        $src: "${process.env.VUE_APP_OSS_SRC}";
        `
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 144
          })
        ]
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
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    open: true, // 是否打开浏览器
    hotOnly: true, // 热更新
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // host: "localhost",
    // port: "8080", // 代理端口
    // https: false,
    proxy: {
      '/api': {
        target: 'http://www.baidu.com/',
        // 开启代理，在本地创建一个虚拟服务端
        changeOrigin: true,
        // 是否启用websockets
        // ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
