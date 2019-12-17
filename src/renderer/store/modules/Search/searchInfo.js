import FetchData from '@/utils/FetchData'
import API from '@/api/index'
import {
  tbGetLocaalstorge,
  tbSetLocaalstorge
} from '@/utils/tools.js'
export const SEARCH_HISTORY = 'SEARCH_HISTORY'
export const SEARCH_INFO = 'SEARCH_INFO'
export const HOT_SEARCH = 'HOT_SEARCH'
export const SEARCH_SUGGEST = 'SEARCH_SUGGEST'

const state = () => {
  return {
    // 搜索历史
    searchHistory: [],
    // 热门搜索
    hotSearch: [],
    // 搜索信息
    searchInfo: {},
    // 搜索提示
    searchSuggest: []
  }
}

const mutations = {
  [SEARCH_INFO] (state, payload) {
    if (!payload.no) {
      let searchInfo = {}
      searchInfo.all = payload.data.card_list
      state.searchInfo = searchInfo
    } else {

    }
  },
  [SEARCH_HISTORY] (state, payload) {
    // console.log(payload)
    let searchHistory = payload.searchHistory
    state.searchHistory = searchHistory
  },
  [HOT_SEARCH] (state, payload) {
    let hotSearch = payload.data
    state.hotSearch = hotSearch.hotlist || []
  },
  [SEARCH_SUGGEST] (state, payload) {
    let searchSuggest = payload.data
    state.searchSuggest = searchSuggest.query ? (searchSuggest && searchSuggest.list && searchSuggest.list.length ? searchSuggest.list : [searchSuggest.query]) : []
  }
}

const actions = {
  // 获取搜索信息
  async getSearchInfo ({ commit, state }, params) {
    let res = await FetchData({
      url: API.GET_SEARCH_INFO,
      params: {
        ...{
          pn: 1,
          rn: 20,
          word: ''
        },
        ...params
      }
    })
    if (res) {
      let data = res.data
      commit(SEARCH_INFO, data)
    }
  },
  // 清除搜索信息
  async clearSearchInfo ({ commit, state }, params) {
    commit(SEARCH_INFO, {
      no: 0,
      data: {
        card_list: []
      }
    })
  },
  // 获取热门搜索
  async getHotSearch ({ commit, state }, params) {
    let res = await FetchData({
      url: API.GET_HOT_SEARCH,
      params: {}
    })
    if (res) {
      let data = res.data
      commit(HOT_SEARCH, data)
    }
  },
  // 获取搜索推荐
  async getSearchSuggest ({ commit, state }, params) {
    let res = await FetchData({
      url: API.GET_SEARCH_SUGGUEST,
      params: {
        word: params.query
      }
    })
    if (res) {
      let data = res.data
      data.data.query = params.query
      commit(SEARCH_SUGGEST, data)
    }
  },
  // 清除搜索推荐
  async clearSearchSuggest ({ commit, state }, params) {
    commit(SEARCH_SUGGEST, {
      no: 0,
      data: {
        list: []
      }
    })
  },
  // 设置搜索历史
  async setSearchHistory ({ commit, state }, params) {
    let query = params.query
    if (state.searchHistory.includes(query)) {
      return
    }
    let searchHistory = [query].concat(state.searchHistory)
    tbSetLocaalstorge('searchHistory', searchHistory)
    commit(SEARCH_HISTORY, {
      searchHistory
    })
  },
  // 获取搜索历史
  async getSearchHistory ({ commit, state }, params) {
    // let searchWord = params.searchWord
    let searchHistory = tbGetLocaalstorge('searchHistory') || []
    commit(SEARCH_HISTORY, {
      searchHistory
    })
  }
}

export default {
  state,
  mutations,
  actions
}
