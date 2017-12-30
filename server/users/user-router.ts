import { Router } from 'express'

import jwtCheck from '../middleware/jwtCheck'
import * as user from './user-controller'


const userRouter: Router = Router()

/* GET user */
userRouter.get('/profile', jwtCheck, user.getUser)

/* POST user */
userRouter.post('/profile', jwtCheck, user.createUser)


export default userRouter