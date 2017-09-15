import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index'

import { formatDate } from './common/utils/time.js'

import loading from './base/loading/load.js'

import axios from 'axios'

Vue.prototype.axios = axios

Vue.use(loading)

Vue.config.productionTip = false

Vue.filter('formatTime', function(time) {
  return formatDate(time)
})

import './common/sass/main.scss'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
