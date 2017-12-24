import { Router } from 'express'
import * as board from './board-controller'
import jwtCheck from '../middleware/jwtCheck'

const boardRouter: Router = Router()

/**
 * Create a Board
 */
boardRouter.post('/', jwtCheck, board.createBoard)

/**
 * Get a board by title and owner
 */
boardRouter.get('/:name', jwtCheck, board.getBoard)

/**
 * Update a board
 */
// boardRouter.put('/')

/**
 * Delete a board
 */
// boardRouter.delete('/')


export default boardRouter