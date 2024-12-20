import assert from 'node:assert'
import { describe, it } from 'node:test'
import supertest from 'supertest'
import app from '../../../src/app'

describe('Stock contract test', () => {
	it('Should return stock data with a valid symbol', async () => {
		const response = await supertest(app)
			.get('/stock?symbol=aapl.us')
			.set('Accept', 'application/json')
		assert.equal(response.status, 200)
		assert.deepEqual(response.body, {
			symbol: 'AAPL.US',
			open: 233.33,
			high: 235.57,
			low: 233.33,
			close: 235.06,
			volume: 45986189,
			name: 'APPLE',
		})
	})

	it('Should return 404 if symbol not exist', async () => {
		const response = await supertest(app)
			.get('/stock?symbol=hdtdt')
			.set('Accept', 'application/json')
		assert.equal(response.status, 404)
	})

	it('Should return 404 if symbol not provided', async () => {
		const response = await supertest(app)
			.get('/stock')
			.set('Accept', 'application/json')
		assert.equal(response.status, 404)
	})
})
