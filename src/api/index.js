import axios from 'axios'

export function _login(params) {
  const url = '/api/login'
  const data = Object.assign({}, params)

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  }).catch(e => {
    Promise.reject(e)
  })
}

export function _sign(params) {
  const url = '/api/users'
  const data = Object.assign({}, params)
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  }).catch(e => {
    Promise.reject(e)
  })
}
