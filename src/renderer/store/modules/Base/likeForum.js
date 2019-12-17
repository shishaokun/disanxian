import FetchData from '@/utils/FetchData'
import API from '@/api/index'
import {
  tbGetLocaalstorge,
  tbSetLocaalstorge
} from '@/utils/tools.js'
export const LIKE_FORUM = 'LIKE_FORUM'
export const RECENT_FORUM = 'RECENT_FORUM'
export const RECENT_SHOW = 'RECENT_SHOW'
export const BANNER_OPACITY = 'BANNER_OPACITY'

const state = () => {
  return {
    forumList: [],
    // 置顶
    topForum: [],
    // 常逛的吧
    recentForum: [],
    // 是否显示常逛的吧
    recentShow: true,
    bannnerOpacity: 1
  }
}

const mutations = {
  [LIKE_FORUM] (state, payload) {
    // console.log(payload)
    let forumList, topForum
    // 已经登录
    if (payload.data.login_user_info.is_login) {
      forumList = payload.data.liked_forums.list
      topForum = payload.data.topList
      state.forumList = forumList
      state.topForum = topForum
      // console.log(state)
    } else {

    }
  },
  [RECENT_FORUM] (state, payload) {
    // console.log(payload)
    let recentForum = payload.recentForum
    state.recentForum = recentForum
  },
  [RECENT_SHOW] (state, payload) {
    let recentShow = payload.recentShow
    state.recentShow = recentShow
  },
  [BANNER_OPACITY] (state, payload) {
    let bannnerOpacity = payload.bannnerOpacity
    state.bannnerOpacity = bannnerOpacity
    // console.log(bannnerOpacity)
  }
}

const actions = {
  async getLikeForum ({ commit, state }, params) {
    let res = await FetchData({
      url: API.GET_LIKE_FORUM,
      params: {
        // 等级排序 => 0 关注排序=> 1;
        'sortWay': 0,
        ...params
      }
    })
    if (res) {
      let data = res.data
      commit(LIKE_FORUM, data)
    }
  },
  async getRecentForum ({ commit, state }, params) {
    let recentForum = tbGetLocaalstorge('recentForum')
    commit(RECENT_FORUM, {
      recentForum
    })
  },
  async getRecentShow ({ commit, state }, params) {
    let recentShow = tbGetLocaalstorge('recentShow')
    if (typeof recentShow === 'undefined') {
      recentShow = true
    }
    commit(RECENT_SHOW, {
      recentShow
    })
  },
  async setRecentShow ({ commit, state }, params) {
    let recentShow = params.recentShow
    tbSetLocaalstorge('recentShow', recentShow)
    commit(RECENT_SHOW, {
      recentShow
    })
  },
  async setBannerOpacity ({ commit, state }, params) {
    let bannnerOpacity = params.bannnerOpacity
    if (bannnerOpacity > 0) {
      commit(BANNER_OPACITY, {
        bannnerOpacity
      })
    } else {}
  }
}

export default {
  state,
  mutations,
  actions
}
