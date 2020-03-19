import * as types from './mutations-types'
import { MutationTree } from 'vuex'
import { RootState } from '../types'

const mutations: MutationTree<RootState> = {
  [types.SET_SINGER](state, singer: string) {
    state.singer = singer
  }
}
export default mutations
