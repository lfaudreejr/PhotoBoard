import { Router } from 'express'
import jwtCheck from '../middleware/jwtCheck'

import * as pins from './pins-controller'
import * as comments from './comments/comments-controller'

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
 * Get pin by id
 */
pinsRouter.get('/:id', pins.getPin)
/**
 * Update a pin
 */
pinsRouter.put('/:id', jwtCheck, pins.updatePin)
/**
 * Delete a pin
 */
pinsRouter.delete('/:id', jwtCheck, pins.deleteAPin)

/**
 * Add comment to pin
 */
pinsRouter.post('/:id/comments', jwtCheck, comments.createComment)
/**
 * Get Comments for pin
 */
pinsRouter.get('/:id/comments/', comments.getComment)
/**
 * Update a comment on pin
 */
pinsRouter.put('/:id/comments/:comment')

/**
 * Delete a comment to pin
 */
pinsRouter.delete('/:id/comments/:comment', jwtCheck, comments.deleteComment)

export default pinsRouter