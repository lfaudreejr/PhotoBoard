import { NextFunction, Router, Request, Response } from 'express'
import jwtCheck from '../middleware/jwtCheck'
import { default as mongo } from '../services/mongoService'

const userRouter: Router = Router()

/* GET user */
userRouter.get('/profile', jwtCheck, (req: Request, res: Response, next: NextFunction)=> {
  res.json('Sent get request to get user')
})

/* POST user */
userRouter.post('/profile', jwtCheck, (req: Request, res: Response, next: NextFunction) => {
  const profile = {
    _id: req.body.sub,
    name: req.body.name,
    nickname: req.body.nickname,
    picture: req.body.picture,
    locale: req.body.locale
  }
  mongo.create(profile, 'users').then((data) => {
    if (data) {
      return res.json(data.result)
    }
    return res.json('user already created')
  }).catch((err) => {
    console.error(err)
  })
})

/* UPDATE user */
userRouter.put('/', (req: Request, res: Response, next: NextFunction) => {
  return res.json('Sent a put request to update user')
})

export default userRouter