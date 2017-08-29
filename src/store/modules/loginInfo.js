
const state = {
  loginInfo: JSON.parse(sessionStorage.getItem('loginInfo')) || ''
}

const mutations = {
  getLoginInfo(state, data) {
    sessionStorage.setItem('loginInfo', JSON.stringify(data))
    state.loginInfo = data
  }
}

const actions = {
  getLoginInfo(context, params) {
    context.commit('getLoginInfo', params)
  }
}

export default {
  state,
  mutations,
  actions
}
