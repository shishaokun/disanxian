/*
 * @file:获取用户信息
 **/

import FetchData from '@/utils/FetchData'
import API from '@/api/index'

export default async function ({store, route}) {
  let res = {}
  try {
    res = await FetchData(API.GET_USER_INFO)
  } catch (e) {
    throw new Error()
  }
  let data = res.data
  if (data) {
    let userInfo = data.data
    store.originalCommit('USER_INFO', {
      userInfo
    })
    // if (route.path === '/') {
    //   var path = data.data.is_login ? '/forum?shownew=1' : '/feed?shownew=1'
    //   return redirect({
    //     path: path,
    //     // external: true
    //     replace: true
    //   })
    // }
  }
}
