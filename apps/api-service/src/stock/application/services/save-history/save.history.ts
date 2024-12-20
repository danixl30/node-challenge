import { GetCurrentDate } from '../../../../core/application/date.generator'
import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import { ApplicationService } from '../../../../core/application/service'
import { GetStockBySymbol } from '../../providers/get.stock'
import { SaveHistory } from '../../repositories/history.repository'
import { SaveHistoryDTO } from './types/dto'
import { SaveHistoryResponse } from './types/response'

export const saveHistory =
	(
		dateProvider: GetCurrentDate,
		stockProvider: GetStockBySymbol,
		saveHistory: SaveHistory,
	): ApplicationService<SaveHistoryDTO, SaveHistoryResponse> =>
	async (data) => {
		const stock = await stockProvider(data.symbol)
		if (!stock) throw new NotFoundException('Stock not found')
		await saveHistory({
			userId: data.userId,
			timestamp: await dateProvider(),
			stock,
		})
		return stock
	}
