import { Request, Response, NextFunction } from 'express'
import { getAllBoardsByOwner } from '../boards/board-funcs'
import { saveUser } from '../users/user-funcs'

export function getUser (req: Request, res: Response, next: NextFunction) {
  getAllBoardsByOwner(req.headers.profile)
  .then((data) => res.json(data))
  .catch((err) => next(err))
}

export function createUser (req: Request, res: Response, next: NextFunction) {
  saveUser(req.body._id)
  .then((data) => res.json(data))
  .catch((err) => next(err))
}