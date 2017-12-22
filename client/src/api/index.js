import axios from 'axios'

export const getToken = () => {
  return localStorage.getItem('access_token')
}

export const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile'))
}

/**
 * Exports
 */

// Post requests
export const post = (route, body) => {
  return axios.post(route, body, {
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
export const put = (route, body) => {
  return axios.put(route, body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
// Delete requests
export const destroy = (route) => {
  return axios.delete(route, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
