import { Response, NextFunction } from "express-serve-static-core";
import * as util from 'util'
import debug = require('debug')
const error = debug('photoboard:error')

export function handleError(error, next: NextFunction) {
  error('Error ' + error)
  return next(error)
}