import { get, post, destroy, getId } from '../api'

export const currentUser = () => getId()

export function createABoard (board) {
  return post('/api/boards', board)
}

export function getUserBoards () {
  return get('/api/user/profile')
}

export async function getOneUserBoard (boardTitle) {
  const board = await get(`/api/boards/${boardTitle}`)
  return board.data
}

export function getUserPinsForBoard (board) {
  return get(`/api/boards/${board}`)
}

export function addPinToUserBoard (pin, board) {
  return post('/api/pins/add', { pin, board })
}

export function deleteAPinFromABoard (pinId) {
  return destroy(`/api/pins/${pinId}`)
}

export async function getUserPins () {
  const boards = await getUserBoards()
  let PromiseArray = []
  boards.data.forEach((board) => {
    PromiseArray.push(getOneUserBoard(board.title))
  })
  const newBoards = await Promise.all(PromiseArray)
  return newBoards.map((newBoard) => newBoard)
}

export function getAPinById (id) {
  return get(`/api/pins/${id}`)
}
