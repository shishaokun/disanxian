import FetchData from '@/utils/FetchData'
import API from '@/api/index'
// import {
//   tbSetLocaalstorge
// } from '@/utils/tools.js'

export const PROFILE_INFO = 'PROFILE_INFO'

const state = () => {
  return {
    profileInfo: {}
  }
}

const mutations = {
  [PROFILE_INFO] (state, payload) {
    // let res = JSON.parse(payload)
    // console.log(res)
    // let profileInfo = {}
    // if (!payload.no) {
    //   let originInfo = payload.data
    //   profileInfo = {
    //     portrait: originInfo.portrait,
    //     portraitUrl: originInfo.portrait_url,
    //     name: originInfo.nickname || originInfo.user_nickname || originInfo.name_show || originInfo.name,
    //     userOther: originInfo,
    //     isLogin: true,
    //     id: originInfo.uid,
    //     tbs: originInfo.itb_tbs || originInfo.tbs
    //   }
    // } else {
    //   profileInfo = {
    //     tbs: payload.data.tbs
    //   }
    // }
    // state.profileInfo = profileInfo
  }
}

const actions = {
  async getProfileInfo ({ commit, state }, params) {
    let res = await FetchData({
      url: API.GET_PROFILE_INFO,
      params: {
        id: params.id,
        __type: 'json'
      }
    })
    if (res) {
      let data = res.data
      // console.log(data)
      commit(PROFILE_INFO, data)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
