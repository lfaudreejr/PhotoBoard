import * as api from '../api'

export const User = {
  init: function (who) {
    this.currentUser = who
  },
  async createABoard (board) {
    return api.post('/api/boards', board)
  },
  async getUserBoards () {
    const boards = await api.get('/api/user/profile')
    return boards.data
  },
  async getOneUserBoard (boardTitle) {
    const board = await api.get(`/api/boards/${boardTitle}`)
    return board.data
  },
  async getUserPins () {
    const boards = await this.getUserBoards()
    let PromiseArray = []
    boards.forEach((board) => {
      PromiseArray.push(this.getOneUserBoard(board.title))
    })
    const newBoards = await Promise.all(PromiseArray)
    return newBoards.map((newBoard) => newBoard)
  }
}
