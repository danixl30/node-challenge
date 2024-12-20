import { Router } from 'express'
import { validateBody } from '../../core/infrastructure/zod.body.validador'
import { changeUserPasswordController } from './controllers/change-password/change.password.controller'
import { changeUserPasswordSchema } from './controllers/change-password/dto'
import { createUserController } from './controllers/create/create.controller'
import { createUserSchema } from './controllers/create/dto'
import { currentUserController } from './controllers/current/current.controller'
import { loginUserSchema } from './controllers/login/dto'
import { loginUserController } from './controllers/login/login.controller'
import { authMiddleware } from './middlewares/auth.user'

export const userRouter = Router()

userRouter.post(
	'/register',
	validateBody(createUserSchema),
	createUserController,
)
userRouter.post('/login', validateBody(loginUserSchema), loginUserController)
userRouter.post(
	'/change/password',
	validateBody(changeUserPasswordSchema),
	changeUserPasswordController,
)
userRouter.get('/current', authMiddleware, currentUserController)
