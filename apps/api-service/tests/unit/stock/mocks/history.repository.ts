import { History } from '../../../../src/stock/application/models/history'
import { SaveHistory } from '../../../../src/stock/application/repositories/history.repository'

export const historyRepositoryMock = (): [SaveHistory, History[]] => {
	const histories: History[] = []
	return [
		async (history) => {
			histories.push(history)
		},
		histories,
	]
}
