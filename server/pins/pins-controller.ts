import { Response, Request } from 'express'

import { savePin, getPins } from './pin-funcs'
import { addPinToBoard } from '../boards/board-funcs'

export function createPin (req: Request, res: Response) {
  savePin({ url: req.body.pin.url, description: req.body.pin.description })
  .then((data) => {
    addPinToBoard(data.ops[0]._id, req.body.board._id)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err))
  })
  .catch((err) => res.status(500).json(err.message))
}

export function getAllPins (req: Request, res: Response) {
  getPins()
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
}