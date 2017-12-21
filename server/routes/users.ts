import { Router, Request, Response } from 'express'
import jwtCheck from '../middleware/jwtCheck'

const userRouter: Router = Router()

/* GET user */
userRouter.get('/', jwtCheck, (req: Request, res: Response)=> {
  res.json('Sent get request to get user')
})

/* POST user */
userRouter.post('/', jwtCheck, (req: Request, res: Response) => {
  res.json('Sent a post request to add user')
})

/* UPDATE user */
userRouter.put('/', (req: Request, res: Response) => {
  res.json('Sent a put request to update user')
})

export default userRouter