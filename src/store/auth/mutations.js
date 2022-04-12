export const setToken = (state, token) => {
  state.token = token
  state.isAuthenticated = true
  window.localStorage.setItem('token', JSON.stringify(token))
}

export const removeToken = (state) => {
  state.token = ''
  state.isAuthenticated = false
  window.localStorage.removeItem('token')
}

export const setMe = (state, me) => {
  state.me = me
}

export const setIsAuthenticated = (state, isAuthenticated) => {
  state.isAuthenticated = isAuthenticated
}
