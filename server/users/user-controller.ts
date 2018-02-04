import { Request, Response, NextFunction } from 'express'
import { saveUser, findUser } from '../users/user-funcs'
import { handleError, returnJSONResponse } from '../helpers'

export function createUser (req: Request, res: Response, next: NextFunction) {
  const { _id } = req.body
  findUser(_id)
    .then((data) => {
      if (data._id) {
        return returnJSONResponse({ message: "User exists" }, res)
      } else {
        return saveUser(_id)
        .then((data: any) => returnJSONResponse(data.ops[0], res))
        .catch((err) => handleError(err, next))
      }
    })
    .catch((err) => {

    })
}