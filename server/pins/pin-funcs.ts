import {default as mongo} from '../services/mongoService'
import { 
  ObjectID,
  InsertOneWriteOpResult, 
  FindAndModifyWriteOpResultObject 
} from 'mongodb';

export function savePin (pin: object): Promise<InsertOneWriteOpResult> {
  return mongo.create(pin, 'pins')
}

export function getPins () {
  return mongo.readAll({}, 'pins', {})
}

export function deletePinFromPins (id: string): Promise<FindAndModifyWriteOpResultObject> {
  return mongo.destroy({ _id: new ObjectID(id) }, 'pins')
}

export function deletePinFromUserBoard (userId: string | string[], pinId: string) {
  return mongo.update({ owner: userId }, 'boards', { $pull: {pins: new ObjectID(pinId)} })
}