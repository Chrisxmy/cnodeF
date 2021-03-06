import Vue from 'vue'
import Vuex from 'vuex'

import loginInfo from './modules/loginInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginInfo
  }
})
