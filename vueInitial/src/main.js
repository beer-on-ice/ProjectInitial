import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import i18n from './locales'

// 引入iconfont全局样式
import './assets/iconfonts/iconfont.css'

// 引入swiper全局样式
// import 'swiper/dist/css/swiper.css'

// 引入svg处理
import './components/SvgIcon/index.js'

// 引入elementUI
import './plugins/element.js'

// 引入iviewUI
// import './plugins/iview.js'

/*
  * 引入rem插件(适用非响应式布局,如要兼容pc，设置node_modules/lib-flexible/文件里72行为 54->width)
  * 同时修改 postcss.config.js里到合适自己的
*/
import 'lib-flexible/flexible.js'

// 兼容ie
import '@babel/polyfill'

// 引入请求方法
import api from './utils/http'

Vue.use(api)

Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
