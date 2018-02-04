import * as funcs from '../core/user-funcs'
import EventEmitter from 'eventemitter3'

export let userBoards

function loadUsersBoards () {
  funcs.getUserBoards()
  .then((data) => data.data)
  .catch((err) => console.error(err))
}

export const boardEmitter = new EventEmitter()

boardEmitter.on('loadBoards', loadUsersBoards())
