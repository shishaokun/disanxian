// import FetchData from '@/utils/FetchData'
// import API from '@/api/index'
import {
  tbSetLocaalstorge
  // tbSetLocaalstorge
} from '@/utils/tools.js'

export const SET_APP_INFO = 'SET_APP_INFO'

const state = () => {
  return {
    randomId: ''
  }
}

const getters = {
//   isLogin (state) {
//     return state.isLogin
//   // },
//   // userInfo (state) {
//   //   return state.userInfo
//   }
}

const mutations = {
  [SET_APP_INFO] (state, payload) {
    state.randomId = payload.randomId
    tbSetLocaalstorge('randomId', payload.randomId)
  }
}

const actions = {
  setAppInfo ({ commit, state }, params) {
    commit(SET_APP_INFO, {
      randomId: params.randomId
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
