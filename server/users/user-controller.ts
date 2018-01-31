import { Request, Response, NextFunction } from 'express'
import { saveUser } from '../users/user-funcs'

export function createUser (req: Request, res: Response, next: NextFunction) {
  saveUser(req.body._id)
  .then((data) => res.json(data.ops[0]))
  .catch((err) => next(err))
}