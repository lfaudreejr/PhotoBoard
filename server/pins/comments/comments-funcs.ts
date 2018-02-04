import {default as mongo} from '../../services/mongoService'
import { 
  ObjectID,
  InsertOneWriteOpResult, 
  FindAndModifyWriteOpResultObject 
} from 'mongodb';

export async function saveComment (pinId: string, comment: object) {
  const savedComment: any = await mongo.create(comment, 'comments')
  const saveCommentToPin: any = await mongo.update({ _id: new ObjectID(pinId) }, 'pins', { $push: { comments: savedComment.ops[0] } })
  return saveCommentToPin.value
}

export async function getCommentsForPin (pinId: string) {
  const comments = await mongo.readOne({ _id: new ObjectID(pinId)}, 'comments', {})
  return comments
}

export async function deleteCommentFromPin (pinId: string, commentId: string) {
  const removeCommentIdFromPin = await mongo.update({ _id: new ObjectID(pinId) }, 'pins', { $pull: { comments: { _id: new ObjectID(commentId) } } })
  const deleteComment: any = await mongo.destroy({ _id: new ObjectID(commentId) }, 'comments')
  return deleteComment.value
}