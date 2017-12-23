import { Router, Response, Request } from 'express'
import jwtCheck from '../middleware/jwtCheck'
import { default as mongo } from '../services/mongoService'

const boardRouter: Router = Router()

/* Post a board */
boardRouter.post('/', (req: Request, res: Response) => {
  mongo.update({ _id: req.body.user.sub }, 'users', { $addToSet: { boards: { name: req.body.name, pins: [] } } })
  .then((data) => {
    return res.json(data.value.boards)
  })
  .catch((err) => console.error(err))
})
/* Get A Board */
boardRouter.get('/:name', (req: Request, res: Response) => {
  mongo.readOne({ _id: req.headers.profile },
  'users')
  .then((data) => {
    const pin = data.boards.filter((board) => {
      return board.name == req.params.name
    })
    return res.json(pin)
  })
  .catch((err) => {
    console.error(err)
  })
})
/* Update a board */
boardRouter.put('/', (req: Request, res: Response) => {
  const update = {}
  mongo.update(update, 'users', {}).then().catch()
})
/* Delete a board */
boardRouter.delete('/')

export default boardRouter