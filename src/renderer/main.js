import Vue from 'vue'
// import VueLazyload from 'vue-lazyload'
import axios from 'axios'
// import VueTouch from 'vue-touch'
import vuescroll from 'vue-scroll'

import App from './App'
import router from './router'
import store from './store'

import {
  tbGetLocaalstorge
} from './utils/tools'

// import {
//   session
// } from 'electron'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// Vue.use(VueTouch, {
//   name: 'v-touch'
// })
// session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//   details.requestHeaders['User-Agent'] = 'SuperDuperAgent'
//   // eslint-disable-next-line standard/no-callback-literal
//   callback({
//     cancel: false,
//     requestHeaders: details.requestHeaders
//   })
// })

const getReturnUrl = (urlOpts) => {
  return encodeURIComponent(urlOpts.fullPath)
}

// 登录判断
router.beforeEach((to, from, next) => {
  // 获取用户登录成功后储存的登录标志
  let loginFlag = tbGetLocaalstorge('isLogin')
  if (loginFlag === 'logined') {
    // 设置vuex登录状态为已登录 todo
    // store.state.isLogin = true
    next()
  } else {
    if (to.meta.needLogin) {
      next({
        path: '/login?before=' + getReturnUrl(from) + '&after=' + getReturnUrl(to)
      })
    // 用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
})

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(vuescroll)
// Vue.use(VueLazyload)
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   // error: 'dist/error.png',
//   // loading: 'dist/loading.gif',
//   attempt: 1
// })
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
