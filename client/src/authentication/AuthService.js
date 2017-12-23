import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import * as api from '../api'
import config from '../config'
import router from '../router'

const getAuth = (() => {
  let auth
  return () => {
    if (auth) {
      return auth
    } else {
      auth = new auth0.WebAuth({
        domain: config.DOMAIN,
        clientID: config.CLIENT_ID,
        redirectUri: config.REDIRECT_URI,
        audience: 'https://photoboard.herokuapp.com/api',
        responseType: 'token id_token',
        scope: 'openid profile'
      })
      return auth
    }
  }
})()

function loginToApi () {
  return api.post('/api/user/profile', api.getProfile()).then((data) => console.log(data)).catch((err) => console.error(err.message))
}

function setSession (authResult) {
  let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
  localStorage.setItem('access_token', authResult.accessToken)
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('expires_at', expiresAt)
  authNotifier.emit('authChange', { authenticated: true })
}

function getProfile (authResult) {
  getAuth().client.userInfo(authResult.accessToken, (err, user) => {
    if (err) console.log(err)
    localStorage.setItem('id', JSON.stringify(user.sub))
    localStorage.setItem('profile', JSON.stringify(user))
    setTimeout(() => {
      loginToApi()
    }, 1000)
  })
}
function isAuthenticated () {
  // Check whether the current time is past the
  // access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}
/**
 * Exports
*/
export const login = () => getAuth().authorize()
export const handleLogin = () => getAuth().parseHash((err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    setSession(authResult)
    getProfile(authResult)
    return router.replace('/')
  } else if (err) {
    router.replace('/')
    console.error(err)
    alert(`Error: ${err.error}. Check the console for further details.`)
  }
})
export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
  localStorage.removeItem('profile')
  localStorage.removeItem('id')
  authNotifier.emit('authChange', false)
  router.replace('/')
}
export const authNotifier = new EventEmitter()
export const authenticated = isAuthenticated()
