/**
 * login
 *
 * @param  {string} content 原字符串
 * @return {string}         替换后的结果
 */
const {
  ipcRenderer
} = require('electron')
ipcRenderer.sendToHost('close')
