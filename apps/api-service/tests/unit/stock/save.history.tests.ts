import assert from 'node:assert'
import { describe, it } from 'node:test'
import { NotFoundException } from '../../../src/core/application/exceptions/not.found.exception'
import { saveHistory } from '../../../src/stock/application/services/save-history/save.history'
import { dateGeneratorMock } from './mocks/date.generator'
import { historyRepositoryMock } from './mocks/history.repository'
import { stockProviderMock } from './mocks/stock.provider'

describe('Stock tests', () => {
	it('Should save history on stock found', async () => {
		const userId = '50760e64-fdd5-4d64-be97-abd1a03d528a'
		const symbol = 'AAPL.US'
		const currentDate = new Date()
		const [saveHistoryOp, histories] = historyRepositoryMock()
		const data = await saveHistory(
			dateGeneratorMock(currentDate),
			stockProviderMock(),
			saveHistoryOp,
		)({
			symbol,
			userId,
		})
		const stockTarget = {
			name: 'APPLE',
			symbol: 'AAPL.US',
			open: 123.66,
			high: 123.66,
			low: 122.49,
			close: 123,
		}
		assert.deepEqual(stockTarget, data)
		assert.deepEqual(histories[0], {
			userId,
			timestamp: currentDate,
			stock: stockTarget,
		})
	})

	it('Should not save history if stock not found', async () => {
		const userId = '50760e64-fdd5-4d64-be97-abd1a03d528a'
		const symbol = 'hudtheth'
		const currentDate = new Date()
		const [saveHistoryOp, histories] = historyRepositoryMock()
		await saveHistory(
			dateGeneratorMock(currentDate),
			stockProviderMock(),
			saveHistoryOp,
		)({
			symbol,
			userId,
		})
			.then(() => assert.fail('The service must to throw an error'))
			.catch((error) => {
				if (!(error instanceof NotFoundException))
					assert.fail('The error not valid')
			})
		assert.equal(histories[0], undefined)
	})
})
