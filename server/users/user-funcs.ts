import {default as mongo} from '../services/mongoService'
import { InsertOneWriteOpResult } from 'mongodb';

export function saveUser (user): Promise<InsertOneWriteOpResult> {
  return mongo.create({ _id: user}, 'users')
}