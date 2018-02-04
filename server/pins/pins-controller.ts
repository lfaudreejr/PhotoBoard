import { Response, Request, NextFunction } from 'express'
import { returnJSONResponse, handleError } from '../helpers'

import { savePin, getPins, getAPin, deletePinFromPins, deletePinFromUserBoard, updateAPinDescription } from './pin-funcs'
import { addPinToBoard } from '../boards/board-funcs'

export function createPin (req: Request, res: Response, next: NextFunction) {
  savePin({ url: req.body.pin.url, description: req.body.pin.description, uploaded_by: req.body.pin.uploaded_by, saved_by: req.body.pin.saved_by })
  .then((data: any) => {
    addPinToBoard(data.ops[0]._id, req.body.board._id)
    .then(data => returnJSONResponse(data, res))
    .catch(err => handleError(err, next))
  })
  .catch(err => handleError(err, next))
}

export function getAllPins (req: Request, res: Response, next: NextFunction) {
  getPins()
  .then(data => returnJSONResponse(data, res))
  .catch(err => handleError(err, next))
}

export function getPin (req: Request, res: Response, next: NextFunction) {
  getAPin(req.params.id)
  .then(data => returnJSONResponse(data, res))
  .catch(err => handleError(err, next))
}

export function deleteAPin (req: Request, res: Response, next: NextFunction) {
  Promise.all([deletePinFromPins(req.params.id), deletePinFromUserBoard(req.headers.profile, req.params.id) ]).then(data => returnJSONResponse(data, res))
  .catch(err => handleError(err, next))
}

export function updatePin (req: Request, res: Response, next: NextFunction) {
  const { body } = req
  updateAPinDescription(req.params.id, body)
  .then(data => returnJSONResponse(data, res))
  .catch(err => handleError(err, next))
}