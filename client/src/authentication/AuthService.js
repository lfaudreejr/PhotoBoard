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

function isAuthenticated () {
  // Check whether the current time is past the
  // access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

function saveUserToApi () {
  return new Promise((resolve, reject) => {
    const profile = getUserProfile()
    return api.post('/api/user/profile', { _id: profile.id })
      .then((data) => {
        console.log(data.data)
        resolve(data.data)
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

export const getUserProfile = (() => {
  let theUser
  return () => {
    if (theUser) {
      return theUser
    } else {
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return {
          id: '',
          nickname: '',
          picture: '',
          roles: []
        }
      }
      return getAuth().client.userInfo(accessToken, (err, user) => {
        if (err) return console.error(err)
        theUser = {
          id: user.sub,
          nickname: user.nickname,
          picture: user.picture,
          roles: user['http://myapp.com/roles']
        }
        return theUser
      })
    }
  }
})()

/**
 * Exports
*/
export const login = () => getAuth().authorize()
export const handleLogin = async () => getAuth().parseHash(async (err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)

    const userProfile = getUserProfile()

    authNotifier.emit('profileChange', { currentUser: userProfile })
    authNotifier.emit('authChange', { authenticated: true })

    return router.replace('/')
  } else if (err) {
    setTimeout(() => router.replace('/'), 1000)
    console.error(err)
  }
})

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
  authNotifier.emit('authChange', { authenticated: false })
  authNotifier.emit('profileChange', { currentUser: null })
  router.replace('/')
}

export const isAdmin = () => {
  const user = getUserProfile()
  const isAnAdmin = user.roles.find((e) => e === 'admin')
  if (isAnAdmin) return true
  else return false
}

export const checkIfOwnerOrAdmin = (currentUser, owner) => {
  const isOwner = currentUser === owner
  const admin = isAdmin()
  if (isOwner || admin) return true
  else return false
}

export const authNotifier = new EventEmitter()
export const authenticated = isAuthenticated()

authNotifier.on('authChange', (data) => {
  if (data.authenticated) {
    saveUserToApi()
  }
})
