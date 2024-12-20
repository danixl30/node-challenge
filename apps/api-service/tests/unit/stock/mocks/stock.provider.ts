import { Stock } from '../../../../src/stock/application/models/stock'
import { GetStockBySymbol } from '../../../../src/stock/application/providers/get.stock'

export const stockProviderMock = (): GetStockBySymbol => {
	const stockRecord: Record<string, Stock> = {
		'aapl.us': {
			name: 'APPLE',
			symbol: 'AAPL.US',
			open: 123.66,
			high: 123.66,
			low: 122.49,
			close: 123,
		},
	}
	return async (symbol) => {
		return stockRecord[symbol.toLowerCase()]
	}
}
