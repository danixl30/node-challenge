import axios from 'axios'
import cors from 'cors'
import express from 'express'
import { Stock } from './stock'

const stockApiUrl = process.env.STOCK_API_URL

const app = express()

app.use(express.json())
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		methods: 'GET',
	}),
)

app.get('/stock', async (req, res) => {
	try {
		const { data: stockData } = await axios.get<{
			symbols: Stock[]
		}>(`${stockApiUrl}`, {
			params: {
				e: 'json',
				f: 'sd2t2ohlcvn',
				h: '',
				s: req.query.symbol,
			},
		})
		if (typeof stockData === 'string' || !stockData.symbols[0]?.name) {
			res.status(404).json()
			return
		}
		res.json(
			stockData.symbols.map(({ time: _time, date: _date, ...rest }) => ({
				...rest,
			}))[0],
		)
	} catch (_error) {
		res.status(500).json({
			msg: 'Error during retrive stock',
		})
	}
})

export default app
