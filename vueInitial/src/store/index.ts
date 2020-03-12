import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    strict: IS_PROD, // 是否能直接修改state值，而不通过mutations
    state: defaultState,
    mutations,
    actions,
    getters
  })
}
