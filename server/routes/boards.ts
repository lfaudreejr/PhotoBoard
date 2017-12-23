import { Router, Response, Request } from 'express'
import jwtCheck from '../middleware/jwtCheck'
import { getABoardByTitleAndOwner, saveBoard } from '../boards/board-funcs'

const boardRouter: Router = Router()

/* Post a board */
boardRouter.post('/', (req: Request, res: Response) => {
  saveBoard({
    title: req.body.title,
    pins: [],
    owner: req.body.owner
  })
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
})

/* Get A Board */
boardRouter.get('/:name', (req: Request, res: Response) => {
  getABoardByTitleAndOwner(req.params.name, req.headers.profile)
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
})

/* Update a board */
boardRouter.put('/', (req: Request, res: Response) => {
})

/* Delete a board */
boardRouter.delete('/')

export default boardRouter