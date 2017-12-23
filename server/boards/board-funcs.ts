import {default as mongo} from '../services/mongoService'

export function getAllBoardsByOwner (owner: string | string[]) {
  return mongo.readAll({ owner: owner }, 'boards', {})
}

export function getABoardByTitleAndOwner (title: string, owner: string | string[]) {
  return mongo.readOne({ title: title, owner: owner }, 'boards', {})
}

export function saveBoard (board: object): Promise<{}> {
  return mongo.create(board, 'boards')
}