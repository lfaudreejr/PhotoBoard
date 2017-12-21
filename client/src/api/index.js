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

export const makeAPostRequest = (route, options) => {
  return axios.post(route, options, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}

/**
 * TODO: remove after testing
*/
export const getSecuredAccessPoint = () => {
  return axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
