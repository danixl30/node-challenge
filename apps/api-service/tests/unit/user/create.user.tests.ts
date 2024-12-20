import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { BadException } from '../../../src/core/application/exceptions/bad.exception'
import { Roles } from '../../../src/user/application/models/user'
import { createUserService } from '../../../src/user/application/services/create/create.user.service'
import { cryptoMock } from './mocks/crypto.mock'
import { idMockGenerator } from './mocks/id.generator'
import { passwordGenMock } from './mocks/password.gen.mock'
import { userRepositoryMock } from './mocks/user.repository.mock'

describe('Create user', () => {
	it('Should create user with basic data', async () => {
		const userRepository = userRepositoryMock()
		const userId = 'c0b1cbab-6073-45c7-8d66-48ea717fd123'
		const data = {
			email: 'test@mail.com',
			role: 'admin' as Roles,
		}
		const resp = await createUserService(
			idMockGenerator(userId),
			cryptoMock(),
			userRepository,
			passwordGenMock,
		)(data)
		assert.equal(resp.id, userId)
		assert.deepEqual(await userRepository.findById(userId), {
			...data,
			id: userId,
			password: 'password',
		})
	})

	it('Should not create user with repated email', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				role: 'admin',
			},
		])
		const userId = 'c0b1cbab-6073-45c7-8d66-48ea717fd123'
		const data = {
			email: 'test@mail.com',
			role: 'admin' as Roles,
		}
		await createUserService(
			idMockGenerator(userId),
			cryptoMock(),
			userRepository,
			passwordGenMock,
		)(data)
			.then(() => assert.fail('The service must to throw an error'))
			.catch((error) => {
				if (!(error instanceof BadException))
					assert.fail('Expected bad exception')
			})
	})
})
