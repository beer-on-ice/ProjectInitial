import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import modules from './modules'
import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  strict: IS_PROD, // 是否能直接修改state值，而不通过mutations
  modules,
  state: defaultState,
  mutations,
  actions,
  getters
}
export default () => new Vuex.Store<RootState>(store)
