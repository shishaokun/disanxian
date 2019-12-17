/* eslint-disable */

export const GEN_PORTRAIT = 'https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/'
/**
 * 
 *
 * @param  {string} key 获取数据的key
 * @return {string} object
 */
export function tbGetLocaalstorge(key) {
    try {
        let value  = window.localStorage.getItem('_TIEBA_LITE_' + key)
        return typeof value === 'String' ? value : JSON.parse(value)
    } catch (e) {
        console.warn('err: ', e)
    }
    return ''
}

/**
 * 
 *
 * @param  {string} key 获取数据的key
 * @return {string} object
 */
export function tbSetLocaalstorge(key, value) {
    try {
        let valueStr = typeof value === 'Sting' ? value : JSON.stringify(value)
        window.localStorage.setItem(('_TIEBA_LITE_' + key), valueStr)
        // return typeof value === 'String' ? value : JSON.parse(value)
    } catch (e) {
        console.warn('err: ', e)
    }
}
/**
 * 获取头像url
 * @param  {string} portrait 
 * @return {string} portrait_url
 */
export function getUserPortraitUrl(portrait) {
    if (!portrait) {
        return ''
    } else if (/^http/.test(portrait)) {
        return portrait
    }
    return GEN_PORTRAIT + portrait
}

/**
 * 获取头像 portraitid
 * @param  {string} portrait 
 * @return {string} portrait_url
 */
export function getUserPortrait(portrait) {
    if (!portrait) {
        return ''
    }
    let portraitId = portrait.split('?')[0].split('item/').pop()
    return portraitId
}

/**
 * 获取头像 portraitid
 * @param  {string} portrait 
 * @return {string} portrait_url
 */
export function getUserName(author) {
    if (!author) {
        return ''
    }
    return author.name_show || author.user_nickname || author.nick_name || author.name || author.user_name
}

// 格式化媒体信息
export function formateMidea (data) {
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