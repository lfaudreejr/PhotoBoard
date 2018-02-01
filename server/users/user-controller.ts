import { Request, Response, NextFunction } from 'express'
import { saveUser, findUser } from '../users/user-funcs'

export function createUser (req: Request, res: Response, next: NextFunction) {
  const { _id } = req.body
  findUser(_id)
    .then((data) => {
      if (data._id) {
        return res.json({ message: "User exists" })
      } else {
        return saveUser(_id)
        .then((data) => res.json(data.ops[0]))
        .catch((err) => next(err))
      }
    })
    .catch((err) => {

    })
}