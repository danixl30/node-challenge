import { Router } from 'express'
import { authMiddleware } from '../../user/infrastructure/middlewares/auth.user'
import { rolesMiddleware } from '../../user/infrastructure/middlewares/roles.user'
import { getStockController } from './controllers/get/get.stock.controller'
import { getUserHistoryController } from './controllers/history/get.user.history'
import { getStatsController } from './controllers/stats/get.stats'

export const stockRouter = Router()

stockRouter.get('/stock', authMiddleware, getStockController)
stockRouter.get('/history', authMiddleware, getUserHistoryController)
stockRouter.get(
	'/stats',
	authMiddleware,
	rolesMiddleware('admin'),
	getStatsController,
)
