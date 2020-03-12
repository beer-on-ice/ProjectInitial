import * as types from './mutations-types'

export default {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}
