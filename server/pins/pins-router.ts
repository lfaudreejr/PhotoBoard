import { Router } from 'express'

import * as pins from './pins-controller'
import jwtCheck from '../middleware/jwtCheck'

const pinsRouter: Router = Router()

/**
 * Create a pin
 */
pinsRouter.post('/add', jwtCheck, pins.createPin)

/**
 * Get pin by id
 */
// pinsRouter.get('/:id', (req: Request, res: Response) => {})

/**
 * Get all pins
 */
pinsRouter.get('/all', pins.getAllPins)

/**
 * Update a pin
 */
// pinsRouter.put('/all', (req: Request, res: Response) => {})

/**
 * Delete a pin
 */
pinsRouter.delete('/:id', pins.deleteAPin)


export default pinsRouter