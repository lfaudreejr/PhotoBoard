import { get, put, post, destroy } from '../api'
import EventEmitter from 'eventemitter3'

export const dataEmitter = new EventEmitter()

export function createABoard (board) {
  return post('/api/boards', board)
}

export function getUserBoards () {
  return get('/api/boards')
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

export function getAllPins () {
  return get('/api/pins/all')
}

export function getAPinById (id) {
  return get(`/api/pins/${id}`)
}

export function updateAPin (id, desc) {
  return put(`/api/pins/${id}`, { description: desc })
}

export function updateABoard (board, update) {
  return put(`/api/boards/${board}`, update)
}

export function deleteABoard (id) {
  return destroy(`/api/boards/${id}`)
}

export function addCommentToPin (id, comment) {
  return post(`/api/pins/${id}/comments`, comment)
}

export function getCommentsToPin (id) {
  return get(`/api/pins/${id}/comments`)
}

export function deleteCommentsFromPin (id, commentId) {
  return destroy(`/api/pins/${id}/comments/${commentId}`)
}
