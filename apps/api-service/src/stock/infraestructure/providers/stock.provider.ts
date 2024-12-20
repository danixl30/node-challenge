import axios, { AxiosError } from 'axios'
import { Stock } from '../../application/models/stock'
import { GetStockBySymbol } from '../../application/providers/get.stock'

const baseURL = process.env.STOCKS_URL

export const externalStockProviderBySysmol: GetStockBySymbol = async (
	symbol,
) => {
	try {
		const { data: stockData } = await axios.get<Stock>(`${baseURL}/stock`, {
			params: {
				symbol,
			},
		})
		return stockData
	} catch (error) {
		if (error instanceof AxiosError)
			if (error.status === 404) return undefined
		throw error
	}
}
