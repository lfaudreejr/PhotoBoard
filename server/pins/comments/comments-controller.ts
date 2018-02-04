import { Response, Request, NextFunction } from 'express'
import { returnJSONResponse, handleError } from '../../helpers'


import { saveComment, getCommentsForPin, deleteCommentFromPin } from './comments-funcs'

export function createComment (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  saveComment(req.params.id, body)
    .then((doc) => returnJSONResponse(doc, res))
    .catch((err) => handleError(err, next))
}

export function getComment (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  getCommentsForPin(req.params.id)
    .then((docs) => returnJSONResponse(docs, res))
    .catch((err) => handleError(err, next))
}

export function deleteComment (req: Request, res: Response, next: NextFunction) {
  console.log('id', req.params.id, 'comment', req.params.comment )
  deleteCommentFromPin(req.params.id, req.params.comment)
    .then((doc) => returnJSONResponse(doc, res))
    .catch((err) => handleError(err, next))
}