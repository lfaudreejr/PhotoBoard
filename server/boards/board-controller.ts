import { Response, Request, NextFunction } from 'express'
import { handleError } from '../helpers'
import * as util from 'util'

import { 
  getABoardByTitleAndOwner,
  saveBoard, 
  getBoardPins, 
  editBoard, 
  deleteABoard, 
  getAllBoardsByOwner
} from '../boards/board-funcs'

import { deletePinFromPins } from '../pins/pin-funcs'

import debug = require('debug')
const log   = debug('photoboard:controller-boards')
const error = debug('photoboard:error')

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
      log('Sending data ' + util.inspect(data))
      return res.json(data)
    })
    .catch((err) => next(err))
  })
  .catch((err) => next(err))
}

export function updateBoard (req: Request, res: Response, next: NextFunction) {
  editBoard({ title: req.params.name }, { $set: { title: req.body.title } })
  .then((data) => {
    log('Sending data ' + util.inspect(data))
    return res.json(data)
  })
  .catch((err) => next(err))
}
export function deleteBoard (req: Request, res: Response, next: NextFunction) {
  console.log('request', req.params)
  deleteABoard(req.params.id)
  .then((data:any) => {
    log('Deleted ' + util.inspect(data))
    data.value.pins.forEach(async (pin) => {
      await deletePinFromPins(pin)
    })
    return res.json(data)
  })
  .catch((err) => next(err))
}

export function getBoardsForUser (req: Request, res: Response, next: NextFunction) {
  getAllBoardsByOwner(req.headers.profile)
  .then((data) => {
    log('Sending data ' + util.inspect(data))
    return res.json(data)
  })
  .catch((err) => next(err))
}