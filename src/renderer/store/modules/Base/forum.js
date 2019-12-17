import FetchData from '@/utils/FetchData'
import API from '@/api/index'
import {
  tbGetLocaalstorge,
  tbSetLocaalstorge
} from '@/utils/tools.js'
const _ = require('lodash')

export const FORUM_MAP = 'FORUM_MAP'
const isFirstPage = true
const state = () => {
  return {
    forumMap: tbGetLocaalstorge('forumMap') || {}
  }
}
// 格式化帖子列表：获取置顶帖、格式化媒体信息
const formateThreadList = (threadList) => {
  let topList = []
  let clearThreadList = []
  let count = 0
  if (isFirstPage) {
    threadList.map((item, index) => {
      // 是否是置顶
      if (item.is_notice || item.is_top) {
        count++
        topList.push(topThreadFormat(item))
        // threadList.splice(index, 1)
      } else {
        // 格式化
        let clearThread = formateMidea(item)
        clearThreadList.push(clearThread)
      }
    })
  }
  // console.log(count)
  return {
    topThreadList: {
      topThreadList: _.chunk(topList, 2),
      topCount: Math.round(count / 2)
    },
    threadList: clearThreadList
  }
}
// 格式化媒体信息
const formateMidea = (data) => {
  let imageMedia = []
  let videoMedia = []
  // let allPicLens = 0
  if (data.media) {
    // 图片的最大宽度为  （屏幕总宽度-左右padding宽-2* 间隙）/ 3*2+间隙
    for (let i = 0, len = Math.min(data.media.length, 3); i < len; i++) {
      if (data.media.length === 1) { // 单图
        // let picInfo = getSinglePicWH(data.media[i].width, data.media[i].height)
        data.media[i].isGif = data.media[i].is_gif
        // data.media[i].width = picInfo.resultW
        // data.media[i].height = picInfo.resultH
        // data.media[i].isSuper = picInfo.picType === 'superH' || picInfo.picType === 'superW'
      } else if (data.media.length > 1) {
        data.media[i].isGif = data.media[i].is_gif
      }
      let mediaData = data.media[i]
      // 图片 图片和视频只显示一组
      if (mediaData.type === 'pic' && !videoMedia.length) {
        imageMedia.push(mediaData)
      } else if (mediaData.type === 'flash' && !imageMedia.length) { // 视频 图片和视频只显示一组
        if (data.video_info) {
          mediaData.videoInfo = {
            video_duration: +data.video_info.video_duration || 0,
            play_num: +data.video_info.play_count || 0,
            thumbnail_url: data.video_info.thumbnail_url,
            vpic: data.video_info.thumbnail_url,
            source: data.video_info.video_url,
            tid: data.tid
          }
        }
        videoMedia.push(mediaData)
      }
    }
  }
  data.video = videoMedia
  data.new_cover_img = imageMedia
  return data
}
// 获取置顶帖标识
const topThreadFormat = (data) => {
  let text = ''
  if (data.is_klose_top) {
    text = getTextIcon('klose_top')
  } else if (data.is_notice) {
    text = getTextIcon('gonggao')
  } else if (data.game_appcode) {
    text = getTextIcon('game_appcode')
  } else {
    text = getTextIcon('zhiding')
  }
  return {
    title: data.title,
    topType: text,
    id: data.tid
  }
}
// 置顶帖标识map
const getTextIcon = (key) => {
  const dict = {
    jing: '精',
    zhaomu: '召集',
    zhibo: '直播',
    huati: '话题',
    huodong: '活动',
    gonggao: '公告',
    zhiding: '置顶',
    zhuantie: '转贴',
    yuyin: '&nbsp;',
    meizhi_on: '&nbsp;',
    meizhi_off: '&nbsp;',
    picact: '晒图活动',
    lotteryact: '抽奖活动',
    klose_top: '一呼百应',
    game_appcode: '礼包发放',
    headline: '头条'
  }
  return dict[key]
}

const mutations = {
  [FORUM_MAP] (state, payload) {
    // console.log('payload', payload)
    if (+payload.no === 0) {
      let data = payload.data
      let forum = data.frs_data
      let forumInfo = forum.forum
      let threadList = formateThreadList(forum.thread_list)
      let fname = forumInfo.name
      let threadFilter = data.nav_tab_info
      let forumMap = {}
      forumMap[fname] = {
        forumInfo: forumInfo,
        threadList: threadList.threadList,
        page: forum.page,
        topThread: threadList.topThreadList,
        threadFilter: threadFilter,
        timestamp: +new Date()
      }
      state.forumMap = {
        ...forumMap
      }
      // console.log('mutations', state)
      // tbSetLocaalstorge('threadMap', )
    }
  }
}
const actions = {
  /**
   *
   * @param {*} forumName 吧名
   * @param {*} sort_type  回复时间 => 0、发贴时间 => 1
   * @param {*} res_num 请求条数
   * @param {*} obj_source 来源
   * @param {*} open_source 首次进入参数，用于统计
   * @param {*} lm 是否是精华帖 4 => 是
   */
  async forumInfo ({ commit, state }, params) {
    let forumName = params.forumName
    // console.log(state.forumMap)
    if (state.forumMap[forumName]) {
      return state.forumMap[forumName]
    } else {
      await FetchData({
        url: API.GET_FORUM_INFO,
        params: {
          ...{
            pnum: 1,
            sort_type: 0,
            obj_source: '',
            open_source: '',
            res_num: 20
          },
          ...params
        }
      }).then((res) => {
        if (res) {
          let data = res.data
          commit(FORUM_MAP, data)
          return data
        }
      })
    }
  },
  /**
   * 设置常逛的吧
   * @param {*} forum 吧信息
   *
   */
  async setRecentForum ({ commit, state }, params) {
    let forum = params.forum
    if (_.isEmpty(forum)) {
      return
    }
    let recentForum = []
    let match = false
    let originRecentForum = tbGetLocaalstorge('recentForum')
    if (originRecentForum) {
      _.forEach(originRecentForum, oldForum => {
        if (+forum.id === +oldForum.id) {
          match = true
          return false
        }
      })
      if (match) {
        return
      }
      recentForum = [forum].concat(originRecentForum)
    } else {
      recentForum.push(forum)
    }
    tbSetLocaalstorge('recentForum', recentForum)
  }
}

export default {
  state,
  mutations,
  actions
  // getters
}
