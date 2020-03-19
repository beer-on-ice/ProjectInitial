import { ActionTree } from 'vuex'
import { SET_SINGER } from '../mutations/mutations-types'
import { RootState } from '../types'

const actions: ActionTree<RootState, RootState> = {
  saveSinger({ commit }, query) {
    commit(SET_SINGER, query)
  }
}

export default actions
