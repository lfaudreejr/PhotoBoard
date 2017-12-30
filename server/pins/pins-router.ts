import { Router } from 'express'

import * as pins from './pins-controller'
import jwtCheck from '../middleware/jwtCheck'

const pinsRouter: Router = Router()

/**
 * Create a pin
 */
pinsRouter.post('/add', jwtCheck, pins.createPin)

/**
 * Get all pins
 */
pinsRouter.get('/all', pins.getAllPins)

/**
 *  /:id route handler
 */
pinsRouter.route('/:id')
/**
 * Get pin by id
 */
  .get(pins.getPin)
/**
 * Update a pin
 */
  .put(jwtCheck, pins.updatePin)
/**
 * Delete a pin
 */
  .delete(jwtCheck, pins.deleteAPin)

/**
 * Update a pin
 */
// pinsRouter.put('/:id', jwtCheck, pins.updatePin)

/**
 * Get pin by id
 */
// pinsRouter.get('/:id', pins.getPin)

/**
 * Delete a pin
 */
// pinsRouter.delete('/:id', jwtCheck, pins.deleteAPin)


export default pinsRouter