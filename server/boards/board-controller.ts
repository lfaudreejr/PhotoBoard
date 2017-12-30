import { Response, Request } from 'express'
import { getABoardByTitleAndOwner, saveBoard, getBoardPins } from '../boards/board-funcs'

export function createBoard (req: Request, res: Response) {
  saveBoard({
    title: req.body.title,
    pins: [],
    owner: req.body.owner
  })
  .then((data) => {
    const { ops }: any = data
    return res.json(ops[0])
  })
  .catch((err) => res.status(500).json(err.message))
}

export function getBoard (req: Request, res: Response) {
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
    .catch((err) => res.status(500).json(err.message))
  })
  .catch((err) => res.status(500).json(err.message))
}