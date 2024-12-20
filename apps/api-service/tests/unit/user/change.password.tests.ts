import assert from 'node:assert'
import { describe, it } from 'node:test'
import { updateUserPassword } from '../../../src/user/application/services/update-password/update.password'
import { Optional } from '../../../src/utils/types/optional'
import { cryptoMock } from './mocks/crypto.mock'
import { passwordGenMock } from './mocks/password.gen.mock'
import { userRepositoryMock } from './mocks/user.repository.mock'

describe('Change user password', () => {
	it('Should update user password to existeng user', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				role: 'admin',
			},
		])
		let password: Optional<string>
		await updateUserPassword(
			userRepository,
			passwordGenMock,
			cryptoMock(),
			[
				async (_user, pass) => {
					password = pass
				},
			],
		)({
			email: 'test@mail.com',
		})
		assert.equal(password, 'password')
		const user = await userRepository.findByEmail('test@mail.com')
		assert.equal(user?.password, 'password')
	})
	it('Should not update user password if the email not exist', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				role: 'admin',
			},
		])
		let password: Optional<string>
		await updateUserPassword(
			userRepository,
			passwordGenMock,
			cryptoMock(),
			[
				async (_user, pass) => {
					password = pass
				},
			],
		)({
			email: 'test1@mail.com',
		})
		assert.notEqual(password, 'password')
		const user = await userRepository.findByEmail('test@mail.com')
		assert.equal(user?.password, 'test')
	})
})
