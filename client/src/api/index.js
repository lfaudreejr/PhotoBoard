import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('access_token')
}

const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile'))
}

export const getSecuredAccessPoint = () => {
  return axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Profile: getProfile()
    }
  })
}
