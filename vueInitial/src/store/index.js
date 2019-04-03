import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV === 'development'
export default () => {
  return new Vuex.Store({
    strict: !isDev, // 是否能直接修改state值，而不通过mutations
    state: defaultState,
    mutations,
    actions,
    getters
  })
}
