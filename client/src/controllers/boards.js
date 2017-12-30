import * as funcs from '../core/user-funcs'
import EventEmitter from 'eventemitter3'

export let userBoards

function loadUsersBoards () {
  return new Promise((resolve, reject) => {
    funcs.getUserBoards()
    .then((data) => {
      userBoards = data.data
      resolve(userBoards)
    })
    .catch((err) => reject(err))
  })
}

export const boardEmitter = new EventEmitter()

boardEmitter.on('loadBoards', loadUsersBoards())
