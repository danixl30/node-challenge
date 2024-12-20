import expressAsyncHandler from 'express-async-handler'
import { dateGenerator } from '../../../../core/infrastructure/date.generator'
import { saveHistory } from '../../../application/services/save-history/save.history'
import { externalStockProviderBySysmol } from '../../providers/stock.provider'
import { saveHistory as repo } from '../../repositories/save.history'

export const getStockController = expressAsyncHandler(async (req, res) => {
	/* #swagger.security = [{
            "bearerAuth": []
    }] */
	// #swagger.tags = ['Stocks']
	// #swagger.summary = 'Get a stock'
	// #swagger.description = 'Get a stock by symbol'
	const stock = await saveHistory(
		dateGenerator,
		externalStockProviderBySysmol,
		repo,
	)({
		userId: req.user.id,
		symbol: String(req.query.q),
	})
	res.json(stock)
})
