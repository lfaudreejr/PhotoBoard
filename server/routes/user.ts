import { Router, Request, Response } from 'express'
import jwtCheck from '../middleware/jwtCheck'
import { default as mongo } from '../services/mongoService'

const userRouter: Router = Router()

/* GET user */
userRouter.get('/profile', jwtCheck, (req: Request, res: Response)=> {
  mongo.readOne({ _id: req.headers.profile }, 'users')
  .then((data) => {
    return res.json(data)
  })
  .catch((err) => console.error(err))
})

/* POST user */
userRouter.post('/profile', jwtCheck, (req: Request, res: Response) => {
  mongo.create({ _id: req.body.sub }, 'users').then((data) => {
    if (data) {
      return res.json(data.result)
    }
    return res.json('user already created')
  }).catch((err) => {
    console.error(err)
  })
})


export default userRouter