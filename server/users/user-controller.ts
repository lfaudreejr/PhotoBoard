import { Request, Response } from 'express'

import { getAllBoardsByOwner } from '../boards/board-funcs'
import { saveUser } from '../users/user-funcs'

export function getUser (req: Request, res: Response) {
  getAllBoardsByOwner(req.headers.profile)
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
}

export function createUser (req: Request, res: Response) {
  saveUser(req.body._id)
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
}