import { Response, Request, NextFunction } from 'express'
import { handleError } from '../../helpers'
import * as util from 'util'
import { saveComment, getCommentsForPin, deleteCommentFromPin } from './comments-funcs'

import debug = require('debug')
const log   = debug('photoboard:controller-comments')
const error = debug('photoboard:error')


export function createComment (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  saveComment(req.params.id, body)
    .then((doc) => {
      log('Sending data ' + util.inspect(doc))
      return res.json(doc)
    })
    .catch((err) => next(err))
}

export function getComment (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  getCommentsForPin(req.params.id)
    .then((docs) => {
      log('Sending data ' + util.inspect(docs))
      return res.json(docs)
    })
    .catch((err) => next(err))
}

export function deleteComment (req: Request, res: Response, next: NextFunction) {
  console.log('id', req.params.id, 'comment', req.params.comment )
  deleteCommentFromPin(req.params.id, req.params.comment)
    .then((doc) => {
      log('Sending data ' + util.inspect(doc))
      return res.json(doc)
    })
    .catch((err) => next(err))
}