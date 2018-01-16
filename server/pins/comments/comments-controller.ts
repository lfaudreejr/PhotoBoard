import { Response, Request, NextFunction } from 'express'

import { saveComment, getCommentsForPin, deleteCommentFromPin } from './comments-funcs'

export function createComment (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  saveComment(req.params.id, body)
    .then((doc) => res.json(doc))
    .catch((err) => next(err))
}

export function getComment (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  getCommentsForPin(req.params.id)
    .then((docs) => res.json(docs))
    .catch((err) => next(err))
}

export function deleteComment (req: Request, res: Response, next: NextFunction) {
  console.log('id', req.params.id, 'comment', req.params.comment )
  deleteCommentFromPin(req.params.id, req.params.comment)
    .then((doc) => res.json(doc))
    .catch((err) => next(err))
}