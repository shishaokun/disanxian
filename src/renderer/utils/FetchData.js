/**
 * @file 统一封装异步请求
 */

import axios from 'axios'
import md5 from '@/utils/md5.js'

export default function FetchData (otps, self) {
  try {
    if (otps.method === 'POST') {
      // to do 判断登录
    }
    let requestData = { ...otps }
    for (let name in otps.data) {
      if (otps.data[name] === '' || otps.data[name] === undefined || otps.data[name] === null || otps.data[name] === '<null>') {
        delete otps.data[name]
      }
    }
    let tbs = window.localStorage.getItem('tbs') || ''
    let randomId = window.localStorage.getItem('randomId') || ''
    let nickName = window.localStorage.getItem('nickName') || ''
    let data = {
      // todo 需要修改
      fr: 'smallapp',
      timestamp: new Date().getTime(),
      tbs: tbs,
      itb_tbs: tbs,
      call_from: 'electronlitetieba',
      // server要小写
      randomid: randomId
    }
    if (nickName) {
      data.nick_name = nickName
    }
    requestData.params = extendSign({
      ...(otps.params || otps.data || {}),
      ...data
    })

    let header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
    // let cookie = getCookie()
    // if (cookie) {
    //   header.Cookie = cookie
    // }
    otps.contentType = 'application/json;text/plain'
    otps.connection = 'keep-alive'
    otps.dataType = 'json'
    requestData.header = {
      ...header,
      ...(otps.header || {})
    }
    // console.log(requestData)
    // return new Promise((resolve, reject) => {
    //   axios(requestData)
    //     .then(response => {
    //       alert('Api--ok')
    //       resolve(response.data)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       reject(error)
    //     })
    // })
    return axios(requestData)
  } catch (e) {
    console.log(e)
  }
}

// /**
//  *
//  * @return {string} cookie字符串
//  */
// export function getCookie() {
//   let isWx = typeof swan === 'undefined'
//   let keys = isWx ? ['cuid', 'imei'] : ['cuid', 'imei', 'BDUSS']
//   let cookie = []
//   keys.map(key => {
//       let value = swan.getStorageSync(key.toLowerCase())
//       if (value) {
//           cookie.push(key + '=' + value)
//       }
//   })
//   if (isWx) {
//       let userInfo = swan.getStorageSync('userInfo')
//       let bduss = userInfo && userInfo.bduss
//       cookie.push('BDUSS=' + bduss)
//   }
//   return cookie.join(';')
// }

/**
 * sign
 *
 * @param  {Object} opts 请求参数
 * @return {Object}      请求参数
 */
export function extendSign (opts) {
  let paramStr = ''
  let paramsList = []
  for (let name in opts) {
    paramsList.push(name)
  }
  paramsList = paramsList.sort((x, y) => {
    if (x > y) {
      return 1
    }
    return -1
  })
  paramsList.forEach(name => {
    paramStr += name + '=' + opts[name]
  })
  paramStr += '0039d79dc3cc2075129745a30237a3c4'
  return {
    ...opts,
    sign: md5(paramStr)
  }
}

// import { net } from 'electron'

// export default async function FetchData (url, params, type = 'get') {
//   try {
//     return await net.request(url, {
//       method: type,
//       params
//     })
//   } catch (e) {
//     console.log(e)
//   }
// }
// // const request = net.request('https://github.com')
// // request.on('response', (response) => {
// //   console.log(`STATUS: ${response.statusCode}`)
// //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
// //   response.on('data', (chunk) => {
// //     console.log(`BODY: ${chunk}`)
// //   })
// //   response.on('end', () => {
// //     console.log('No more data in response.')
// //   })
// // })
// // request.end()
