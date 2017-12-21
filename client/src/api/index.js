import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('access_token')
}

const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile'))
}

/**
 * Exports
 */

// Post requests
export const post = (route, options) => {
  return axios.post(route, options, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
// Get requests
export const get = (route) => {
  return axios.get(route, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
// Put requests
export const put = (route, options) => {
  return axios.put(route, options, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
// Delete requests
export const destroy = (route, options) => {
  return axios.delete(route, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
