import { api } from 'src/boot/axios'
import jwtDecode from 'jwt-decode'

export const doLogin = async ({ commit, dispatch }, payload) => {
  const payloadArray = JSON.parse(JSON.stringify(payload))
  const payloadRefactor = `username=${payloadArray.username}&password=${payloadArray.password}&client_id=angular&grant_type=password`
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic YW5ndWxhcjphbmd1bGFy'
    }
  }

  await api.post('/oauth/token', payloadRefactor, options)
    .then(res => {
      const token = res.data
      api.defaults.headers.common.Authorization = 'Bearer ' + token.access_token

      commit('setToken', token.access_token)
      dispatch('getMe', token.access_token)
    })
}

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = ''
  commit('removeToken')
}

export const getMe = async ({ commit }, token) => {
  const tokenDecoded = jwtDecode(token)
  const email = {
    email: tokenDecoded.user_name
  }

  const options = { headers: { 'Content-Type': 'application/json' } }
  api.defaults.headers.common.Authorization = 'Bearer ' + token
  await api.post('/usuario/buscarPorEmail', email, options)
    .then(res => {
      commit('setMe', res.data)
    })
}

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem('token')
  if (token) {
    await commit('setToken', JSON.parse(token))
    api.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(token)
    dispatch('getMe', JSON.parse(token))
  } else {
    commit('removeToken')
  }
}
