import Vue from 'vue'
import Router from 'vue-router'
import routes from 'config/routes.config.js'

Vue.use(Router)

export default () => {
  return new Router({
    // mode: 'history',
    routes
  })
}
