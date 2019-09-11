import Vue from 'vue'
import Router from 'vue-router'
import routes from '@config/routes.config.js'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

Vue.use(Router)

export default () => {
  return new Router({
    mode: IS_PROD ? 'hash' : 'history',
    routes
  })
}
