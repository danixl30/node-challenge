import { Router } from 'express'
import { stockRouter } from './stock/infraestructure/router'
import { userRouter } from './user/infrastructure/router'

export const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/stock', stockRouter)
