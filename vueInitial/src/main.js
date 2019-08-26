import Vue from 'vue'
import App from './App.vue'
import Router from './router'

//  全局样式
import './assets/styles/global.scss'
import './assets/iconfont/iconfont.css'

// 引入elementUI
import './plugins/element.js'

// 引入rem插件
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

const router = new Router()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
