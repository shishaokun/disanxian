<template>
  <div id="login" class="login">
    <webview
        id="login-wrapper"
        :src="src"
        class="login-wrapper"
        httpreferrer="https://tieba.baidu.com"
        useragent="Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
    ></webview>
  </div>
</template>

<script>
import {
  tbSetLocaalstorge
} from '@/utils/tools'
//   import BottomNavigator from '@/components/common/BottomNavigator'
export default {
  data () {
    return {
      // src: 'https://tieba.baidu.com/index/tbwise'
      // src: 'https://wappass.baidu.com/passport?login&u=https%3A%2F%2Ftieba.baidu.com'
      src: 'static/hybrid/loginHack.html'
    }
  },
  name: 'LoginPage',
  components: {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 为webview 做全屏处理
      // document.getElementsByTagName('body')[0].style = 'height: 100%;width: 100%;overflow: hidden;'
      // document.getElementsByTagName('html')[0].style = 'height: 100%;width: 100%;overflow: hidden;'
      // document.getElementById('app').style = 'height: 100%;width: 100%;overflow: hidden;'

      let _that = this
      let webview = document.getElementById('login-wrapper')
      // const preloadFile = 'file://' + require('path').resolve('static/hybrid/loginHack/test.js')
      // webview.setAttribute('preload', preloadFile)
      // webview.addEventListener('console-message', function (e) {
      //   console.log('Guest page logged a message:', e.message)
      // })
      webview.addEventListener('dom-ready', function () {
        webview.openDevTools()
      })
      webview.addEventListener('close', () => {
        let beforeUrl = _that.$route.query.before
        // let afterUrl = _that.$route.query.after
        _that.$router.replace(beforeUrl)
      })
      // webview.addEventListener('ipc-message', function (event) {
      //   console.log('ipc-message', event.channel)
      // })
      webview.addEventListener('dom-ready', (event) => {
        // console.log(se)
        // let beforeUrl = _that.$route.query.before
        let afterUrl = _that.$route.query.after
        // console.log(afterUrl, beforeUrl)
        console.log(event.srcElement.src)
        // console.log(/tieba\.baidu\.com/.test(event.srcElement.src))
        if (/^https:\/\/tieba\.baidu\.com/.test(event.srcElement.src)) {
          tbSetLocaalstorge('isLogin', 'logined')
          _that.$router.replace(afterUrl)
        }
        // const win = new BrowserWindow({show: false})
        // win.once('ready-to-show', () => win.show())
        // win.loadURL(url)
        // event.newGuest = win
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;

  #app {
      height: 100%;
      width: 100%;
  }
  .login {
      height: 100%;
      width: 100%;
  }
  .login-wrapper {
      height: 100%;
      width: 100%;
      display: inline-flex;
  }
}

</style>
