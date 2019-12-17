'use strict'

import {
  app,
  BrowserWindow,
  session
} from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// console.log('__dirname:' + __dirname)
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    // enableDeviceEmulation: {
    //   screenPosition: 'mobile'
    // },
    show: false,
    backgroundColor: '#2e2c29',
    height: 667,
    width: 375,
    // width: 1000,
    x: 667,
    y: 0,
    resizable: false,
    movable: true,
    maximizable: false,
    /**
     * 是否显示在任务栏
     */
    skipTaskbar: true,
    useContentSize: false,
    title: '百度贴吧',
    icon: '',
    webPreferences: {
      webSecurity: false
    }
    // titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  /** 为图片防盗链做处理, 增加ua */
  var filter = {
    urls: [
      '*://*.bdstatic.com',
      '*://*.hiphotos.baidu.com'
    ]
  }
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['User-Agent'] = 'tiebaFELite/0.0.0.0'
    details.requestHeaders['Referer'] = ''
    // eslint-disable-next-line standard/no-callback-literal
    callback({
      cancel: false,
      requestHeaders: details.requestHeaders
    })
  })
  /** 为图片防盗链做处理 */
}
// app.commandLine.appendSwitch('ignore-certificate-errors', 'true')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
