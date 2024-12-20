import { SaveHistory } from '../../application/repositories/history.repository'
import { History } from '../models/history'

export const saveHistory: SaveHistory = async (history) => {
	await History.create({
		userId: history.userId,
		timestamp: history.timestamp,
		...history.stock,
	})
}
