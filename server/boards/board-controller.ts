import { Response, Request, NextFunction } from 'express'
import { getABoardByTitleAndOwner, saveBoard, getBoardPins, editBoard, deleteABoard } from '../boards/board-funcs'

export function createBoard (req: Request, res: Response, next: NextFunction) {
  saveBoard({
    title: req.body.title,
    pins: [],
    owner: req.body.owner
  })
  .then((data) => {
    const { ops }: any = data
    return res.json(ops[0])
  })
  .catch((err) => next(err))
}

export function getBoard (req: Request, res: Response, next: NextFunction) {
  getABoardByTitleAndOwner(req.params.name, req.headers.profile)
  .then((data) => {
    /**
     * Holder for array of promises
     */
    let pinsPromises = [];
    data.pins.forEach((pin) => {
      pinsPromises.push(getBoardPins(pin))  
    })
    /**
     * Wait for all promises to resolve
     */
    Promise.all(pinsPromises).then((pinsData) => {
      /**
       * Empty pins array and set to new array
       */
      data.pins = null;
      data.pins = pinsData
      /**
       * Return new board
       */
      return res.json(data)
    })
    .catch((err) => next(err))
  })
  .catch((err) => next(err))
}

export function updateBoard (req: Request, res: Response, next: NextFunction) {
  editBoard({ title: req.params.name }, { $set: { title: req.body.title } })
  .then((data) => res.json(data))
  .catch((err) => next(err))
}
export function deleteBoard (req: Request, res: Response, next: NextFunction) {
  console.log('request', req.params)
  deleteABoard(req.params.id)
  .then((data) => res.json(data))
  .catch((err) => next(err))
}