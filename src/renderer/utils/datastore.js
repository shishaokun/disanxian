import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron'
// 根据process.type来分辨在哪种模式使用哪种模块
const APP = process.type === 'renderer' ? remote.app : app
// 获取electron应用的用户目录
const STORE_PATH = APP.getPath('userData')
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) { // 如果不存在路径
    fs.mkdirpSync(STORE_PATH) // 就创建
  }
}
// 初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))
// lowdb接管该文件
const db = Datastore(adapter)
// 暴露出去
export default db
