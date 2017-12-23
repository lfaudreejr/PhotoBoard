import { Router } from 'express'
import userRouter from './user'
import boardRouter from './boards'

const router: Router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)

export default router;
