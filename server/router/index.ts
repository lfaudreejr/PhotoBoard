import { Router } from 'express'
import userRouter from '../users/user-router'
import boardRouter from '../boards/boards-router'
import pinsRouter from '../pins/pins-router';

const router: Router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)
router.use('/pins', pinsRouter)

export default router;
