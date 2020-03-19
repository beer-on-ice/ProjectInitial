import Vue from 'vue'
import App from './App.vue'
import createI18n from './locales'
import createRouter from './router'
import createStore from './store'

// 引入全局样式
import './styles/index.styl'

// 引入iconfont全局样式
import './assets/iconfonts/iconfont.css'

// 引入antd
import './plugins/antd.ts'

// 引入请求方法
import VueAxios from './utils/request'

const i18n = createI18n()
const router = createRouter()
const store = createStore()

window._router = router
// 全局路由钩子函数 对全局有效
// router.beforeEach((to, from, next) => {
//   let auth = to.meta.auth
//   let token = store.getters['login/token']

//   if (auth) {
//     // 需要登录
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// })

Vue.use(VueAxios)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
