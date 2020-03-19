import { GetterTree } from 'vuex'
import { RootState } from '../types'

const getters: GetterTree<RootState, RootState> = {
  singer(state) {
    return state.singer
  }
}

export default getters
