// import FetchData from '@/utils/FetchData'
// import API from '@/api/index'
import recommendData from '@/mock/recommend.js'
// import Vue from 'vue'
let _ = require('lodash')

export const RECOMMEND_MAP = 'RECOMMEND_MAP'

const state = () => {
  return {
    tagList: [],
    tagThreadMap: {},
    hasMore: 1,
    currentTag: 'recom'
  }
}

const getters = {
  getTagRecommend (state) {
    return state.recommendMap
  // },
  // userInfo (state) {
  //   return state.userInfo
  }
}

const mutations = {
  [RECOMMEND_MAP] (state, payload) {
    if (payload.no === 0) {
      let data = payload.data
      if (_.isEmpty(state.tagList)) {
        let threadMap = {}
        data.tag_list.forEach((value) => {
          let key = Object.keys(value).pop()
          threadMap[key] = []
        })
        state.tagThreadMap = threadMap
        state.tagList = data.tag_list
      } else {
        console.log('full')
        // state.tagThreadMap
      }
      // console.log(...data.thread_list)
      let tagThreadMap = state.tagThreadMap
      tagThreadMap[state.currentTag].push(...data.thread_list)
      // todo
      // Vue.set(state.tagThreadMap, state.currentTag)

      state.tagThreadMap = tagThreadMap
      state.hasMore = data.has_more
    }
  }
}

const actions = {
  async getRecommend ({ commit, state }, params) {
    // console.log('getRecommend')
    // let res = await FetchData({
    //   url: API.GET_RECOMMEND,
    //   params: params
    // })
    let res = {
      data: recommendData
    }
    if (res) {
      let data = res.data
      // setTimeout(() => {
      commit('RECOMMEND_MAP', data)
      // }, 1000)
      // return userInfo
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
