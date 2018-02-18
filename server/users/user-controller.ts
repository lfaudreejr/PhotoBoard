import { Request, Response, NextFunction } from 'express'
import { saveUser, findUser } from '../users/user-funcs'
import { handleError, returnJSONResponse } from '../helpers'
import * as util from 'util'

import debug = require('debug')
const log = debug('photoboard:user-controller')
debug('photoboard:error')

export function createUser (req: Request, res: Response, next: NextFunction) {
  const { _id } = req.body
  log('Finding user ' + util.inspect(req.body))
  findUser(_id)
    .then((data) => {
      if (!data) {
        return saveUser(_id)
        .then((user: any) => {
          log('Saved user ' + util.inspect(user))
          return returnJSONResponse(user.ops[0], res)
        })
        .catch((err) => handleError(err, next))
      }
      log('Found user ' + util.inspect(data))
      return returnJSONResponse({ message: "User exists" }, res)
    })
    .catch((err) => {
      next(err)
    })
}