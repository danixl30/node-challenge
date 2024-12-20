import expressAsyncHandler from 'express-async-handler'
import { History } from '../../models/history'

export const getUserHistoryController = expressAsyncHandler(
	async (req, res) => {
		/* #swagger.security = [{
            "bearerAuth": []
    }] */
		// #swagger.tags = ['Stocks']
		// #swagger.summary = 'Get stock history'
		// #swagger.description = 'Get stock history by user'
		const stocks = await History.find({
			userId: req.user.id,
		})
			.sort({
				timestamp: -1,
			})
			.select('-_id -__v -userId')
		res.json(stocks)
	},
)
