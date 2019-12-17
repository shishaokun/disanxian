import FetchData from '@/utils/FetchData'
import API from '@/api/index'
import {
  tbGetLocaalstorge
  // tbSetLocaalstorge
} from '@/utils/tools.js'
// let _ = require('lodash')

export const THREAD_MAP = 'THREAD_MAP'

const state = () => {
  return {
    threadMap: tbGetLocaalstorge('threadMap') || {}
  }
}

const getters = {
  getThread: state => state.threadMap
  // console.log(tid)
  // console.log(state.threadMap)
  // console.log(tid)
  // let thread = state.threadMap
  // thread
  // },
  // userInfo (state) {
  //   return state.userInfo
}

const mutations = {
  [THREAD_MAP] (state, payload) {
    // console.log('payload', payload)
    if (+payload.no === 0) {
      let data = payload.data
      let forum = data.forum
      let postList = data.post_list
      let thread = data.thread
      thread.video_info = data.video_info
      let tid = thread.id
      let threadMap = state.threadMap
      threadMap[tid] = {
        thread: thread,
        forum: forum,
        postList: postList,
        timestamp: +new Date()
      }
      // console.log(threadMap)
      // state.threadMap[tid] = threadInfo
      // // console.log(forum, thread, postList, tid)
      // state.threadMap[tid].forum = forum
      // state.threadMap[tid].thread = thread
      // state.threadMap[tid].postList = postList
      // state.threadMap[tid].timestamp = +new Date()
      state.threadMap = {
        ...threadMap
      }
      // console.log('mutations', state)
      // tbSetLocaalstorge('threadMap', )
    } else {
      let error = payload.error
      let threadMap = state.threadMap
      threadMap[payload.tid] = {
        error: error,
        timestamp: +new Date()
      }
      state.threadMap = {
        ...threadMap
      }
    }
  }
}
const actions = {
  /**
   *
   * @param {*} rn 个数
   * @param {*} see_lz 查看楼主
   * @param kz 贴子id
   * @param has_url_param 0
   * @param is_ajax 1
   * @param post_type normal
   * @param pn 页数
   * @param fid 吧id
   * @param isJump true
   * @param beginPageNum 开始页数
   */
  async threadInfo ({ commit, state }, params) {
    let tid = params.tid
    if (state.threadMap[tid]) {
      return state.threadMap[tid]
    } else {
      await FetchData({
        url: API.GET_THREAD_INFO,
        params: {
          ...params,
          ...{
            kz: params.tid,
            has_url_param: 0,
            is_ajax: 1,
            post_type: 'normal',
            isJump: true
          }
        }
      }).then((res) => {
        if (res) {
          let data = res.data
          data.tid = tid
          commit(THREAD_MAP, data)
          return data
        }
      })
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
