import * as api from '../api'

export function getUserBoards () {
  return api.get('/api/user/profile')
}

export function createABoard (board) {
  return api.post('/api/boards', board)
}

export function getUsersPins (boardTitle) {
  return api.get(`/api/boards/${boardTitle}`)
}
