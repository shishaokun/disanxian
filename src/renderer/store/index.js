import Vue from 'vue'
import Vuex from 'vuex'

// import {
//   createPersistedState
//   // createSharedMutations
// } from 'vuex-electron'

import modules from './modules'
// console.log(modules)
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  debug: true,
  plugins: [
    // createPersistedState()
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
