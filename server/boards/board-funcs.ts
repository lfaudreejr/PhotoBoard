import {default as mongo} from '../services/mongoService'
import { FindAndModifyWriteOpResultObject, InsertOneWriteOpResult, ObjectID } from 'mongodb'

export function getAllBoardsByOwner (owner: string | string[]) {
  return mongo.readAll({ owner: owner }, 'boards', {})
}

export function getABoardByTitleAndOwner (title: string, owner: string | string[]) {
  return mongo.readOne({ title: title, owner: owner }, 'boards', {})
}

export function saveBoard (board: object): Promise<void | InsertOneWriteOpResult> {
  return mongo.create(board, 'boards')
}

export function addPinToBoard (pinId: string, id: string): Promise<void | FindAndModifyWriteOpResultObject<any>> {
  return mongo.update({ _id: new ObjectID(id) }, 'boards', { $push: { pins: pinId } })
}

export function getBoardPins (pinId: string) {
  return mongo.readOne({ _id: new ObjectID(pinId) }, 'pins')
}

export function editBoard (board, update) {
  return mongo.update(board, 'boards', update)
}

export function deleteABoard (boardId) {
  return mongo.destroy({ _id: new ObjectID(boardId) }, 'boards')
}