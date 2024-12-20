import { Stock } from './stock'

export type History = {
	userId: string
	timestamp: Date
	stock: Stock
}
