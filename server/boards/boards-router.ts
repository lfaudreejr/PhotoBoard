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
boardRouter.put('/:name', jwtCheck, board.updateBoard)

/**
 * Delete a board
 */
boardRouter.delete('/:id', jwtCheck, board.deleteBoard)

/**
 * Get all boards for a user
 */
boardRouter.get('/', jwtCheck, board.getBoardsForUser)

export default boardRouter