import { Router, Request, Response } from 'express'
import jwtCheck from '../middleware/jwtCheck'
import { getAllBoardsByOwner } from '../boards/board-funcs'
import { saveUser } from '../users/user-funcs'

const userRouter: Router = Router()

/* GET user */
userRouter.get('/profile', jwtCheck, (req: Request, res: Response) => {
  getAllBoardsByOwner(req.headers.profile)
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
})

/* POST user */
userRouter.post('/profile', jwtCheck, (req: Request, res: Response) => {
  saveUser(req.body._id)
  .then((data) => res.json(data))
  .catch((err) => res.status(500).json(err.message))
})


export default userRouter