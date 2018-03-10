import { Response, Request, NextFunction } from 'express'
import { handleError } from '../helpers'
import * as util from 'util'

import { savePin, getPins, getAPin, deletePinFromPins, deletePinFromUserBoard, updateAPinDescription } from './pin-funcs'
import { addPinToBoard } from '../boards/board-funcs'

import debug = require('debug')
const log   = debug('photoboard:controller-pins')
const error = debug('photoboard:error')

export function createPin (req: Request, res: Response, next: NextFunction) {
  savePin({ url: req.body.pin.url, description: req.body.pin.description, uploaded_by: req.body.pin.uploaded_by, saved_by: req.body.pin.saved_by })
  .then((data: any) => {
    addPinToBoard(data.ops[0]._id, req.body.board._id)
    .then(data => {
      log('Sending data ' + util.inspect(data))
      return res.json(data)
    })
    .catch(err => next(err))
  })
  .catch(err => next(err))
}

export function getAllPins (req: Request, res: Response, next: NextFunction) {
  getPins()
  .then(data => {
    log('Sending data ' + util.inspect(data))
    return res.json(data)
  })
  .catch(err => next(err))
}

export function getPin (req: Request, res: Response, next: NextFunction) {
  getAPin(req.params.id)
  .then(data => {
    log('Sending data ' + util.inspect(data))
    return res.json(data)
  })
  .catch(err => next(err))
}

export function deleteAPin (req: Request, res: Response, next: NextFunction) {
  Promise.all([deletePinFromPins(req.params.id), deletePinFromUserBoard(req.headers.profile, req.params.id) ]).then(data => {
    log('Sending data ' + util.inspect(data))
    return res.json(data)
  })
  .catch(err => next(err))
}

export function updatePin (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  updateAPinDescription(req.params.id, body)
  .then(data => {
    log('Sending data ' + util.inspect(data))
    return res.json(data)
  })
  .catch(err => next(err))
}