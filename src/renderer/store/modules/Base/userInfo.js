import FetchData from '@/utils/FetchData'
import API from '@/api/index'
import {
  tbSetLocaalstorge
} from '@/utils/tools.js'

export const USER_INFO = 'USER_INFO'

const state = () => {
  return {
    userDetail: ''
  }
}

const getters = {
  isLogin (state) {
    return state.isLogin
  // },
  // userInfo (state) {
  //   return state.userInfo
  }
}

const mutations = {
  [USER_INFO] (state, payload) {
    let userInfo = {}
    // 已经登录
    if (!payload.no) {
      let originInfo = payload.data
      userInfo = {
        portrait: originInfo.portrait,
        portraitUrl: originInfo.portrait_url,
        name: originInfo.nickname || originInfo.user_nickname || originInfo.name_show || originInfo.name,
        userOther: originInfo,
        isLogin: true,
        id: originInfo.uid,
        tbs: originInfo.itb_tbs || originInfo.tbs
      }
    } else {
      userInfo = {
        tbs: payload.data.tbs
      }
    }
    state.userDetail = userInfo
    tbSetLocaalstorge('tbs', userInfo.tbs)
    tbSetLocaalstorge('userName', userInfo.name)
    tbSetLocaalstorge('portraitId', userInfo.portrait)
  }
}

const actions = {
  async getUserInfo ({ commit, state }, params) {
    let res = await FetchData({
      url: API.GET_USER_INFO,
      params: {
        'need_user': 1, // 获取用户信息
        ...params
      }
    })
    if (res) {
      let data = res.data
      commit(USER_INFO, data)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
