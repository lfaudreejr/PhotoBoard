import {default as mongo} from '../services/mongoService'
import { FindAndModifyWriteOpResultObject, ObjectID } from 'mongodb'

export function getAllBoardsByOwner (owner: string | string[]) {
  return mongo.readAll({ owner: owner }, 'boards', {})
}

export function getABoardByTitleAndOwner (title: string, owner: string | string[]) {
  return mongo.readOne({ title: title, owner: owner }, 'boards', {})
}

export function saveBoard (board: object): Promise<{}> {
  return mongo.create(board, 'boards')
}

export function addPinToBoard (pinId: string, id: string): Promise<FindAndModifyWriteOpResultObject> {
  return mongo.update({ _id: new ObjectID(id) }, 'boards', { $push: { pins: pinId } })
}

export function getBoardPins (pinId: string) {
  return mongo.readOne({ _id: new ObjectID(pinId) }, 'pins')
}