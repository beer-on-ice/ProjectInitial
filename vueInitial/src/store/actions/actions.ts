import * as types from '../mutations/mutations-types'

export default {
  saveSinger({ commit }, query) {
    commit(types.SET_SINGER, query)
  }
}
