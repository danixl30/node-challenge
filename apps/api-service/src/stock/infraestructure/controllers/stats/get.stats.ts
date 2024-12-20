import expressAsyncHandler from 'express-async-handler'
import { History } from '../../models/history'

export const getStatsController = expressAsyncHandler(async (_req, res) => {
	/* #swagger.security = [{
            "bearerAuth": []
    }] */
	// #swagger.tags = ['Stocks']
	// #swagger.summary = 'Get stock stats'
	// #swagger.description = 'Get stock stats, only for admin'
	const stocks = await History.aggregate([
		{
			$group: {
				_id: '$symbol',
				times_requested: { $sum: 1 },
			},
		},
	])
	res.json(
		stocks.map((e) => ({
			stock: e._id,
			times_requested: e.times_requested,
		})),
	)
})
