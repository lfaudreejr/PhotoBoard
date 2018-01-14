import axios from 'axios'

export const getToken = () => {
  return localStorage.getItem('access_token')
}

export const getProfile = () => {
  const username = JSON.parse(localStorage.getItem('profile'))
  if (username) return username.name
  else return null
}

export const getId = () => {
  return JSON.parse(localStorage.getItem('id'))
}

/**
 * Exports
 */

// Post requests
export const post = (route, body) => {
  return axios.post(route, body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getId()
    }
  })
}
// Get requests
export const get = (route) => {
  return axios.get(route, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getId()
    }
  })
}
// Put requests
export const put = (route, body) => {
  return axios.put(route, body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getId()
    }
  })
}
// Delete requests
export const destroy = (route) => {
  return axios.delete(route, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getId()
    }
  })
}
