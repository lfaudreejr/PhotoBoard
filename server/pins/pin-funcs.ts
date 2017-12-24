import {default as mongo} from '../services/mongoService'
import { InsertOneWriteOpResult } from 'mongodb';

export function savePin (pin: object): Promise<InsertOneWriteOpResult> {
  return mongo.create(pin, 'pins')
}
