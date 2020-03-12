import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/config/routes.config'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

Vue.use(VueRouter)

export default () => {
  return new VueRouter({
    mode: IS_PROD ? 'hash' : 'history',
    routes
  })
}
