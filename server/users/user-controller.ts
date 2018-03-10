import { Request, Response, NextFunction } from 'express'
import { saveUser, findUser } from '../users/user-funcs'
import { handleError } from '../helpers'
import * as util from 'util'

import debug = require('debug')
const log   = debug('photoboard:user-controller')
const error = debug('photoboard:error')

export function createUser (req: Request, res: Response, next: NextFunction) {
  const { _id } = req.body
  log('Finding user ' + util.inspect(req.body))
  findUser(_id)
    .then((data) => {
      if (!data) {
        return saveUser(_id)
        .then((user: any) => {
          log('Saved user ' + util.inspect(user.ops[0]))
          return res.json(user.ops[0])
        })
        .catch((err) => next(err))
      }
      log('Found user ' + util.inspect(data))
      return res.json({ message: "User exists" })
    })
    .catch((err) => {
      error(err.stack)
      next(err)
    })
}