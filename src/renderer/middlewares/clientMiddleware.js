/*eslint-disable*/
/**
 * @file 
 */
import md5 from '@/utils/md5.js'
const MAXNUM = 100000000
const MINNUM = 999999999
export default function ClientMiddleware (context) {
    // try {
    //     window.localStorage.setItem('randomId', getRandomId());
    // } catch (e) {

    // }
    
//   console.log(context.store)
//   context.store.commit('SET_APP_INFO', {
//     'randomId': getRandomId()
//   })
  // console.log(context.$store.dispatch)
  context.$store.dispatch('Base/appInfo/setAppInfo', {
    'randomId': getRandomId()
  })
//   context.store.state.Base.appInfo.randomId = getRandomId()
    
    // context.store.state.clientH = clientH;
    // context.store.state.imgareawidth = clientW - view_margin * 2;
    // context.store.state.imgwidth= (clientW - view_margin * 2 - img_margin * 2) / 3;
}
export function getRandomId () {
    let random = parseInt(Math.random() * (MAXNUM - MINNUM + 1) + MINNUM, 10)
    // console.log(random)
    return md5({
        'random': random,
        '_': +new Date(),
        'fr': 'electronlitetieba'
    })
}