import { CryptoService } from '../../../../core/application/crypto.service'
import { BadException } from '../../../../core/application/exceptions/bad.exception'
import { IDGenerator } from '../../../../core/application/id.generator'
import { GetRandomPassword } from '../../../../core/application/random.password'
import { ApplicationService } from '../../../../core/application/service'
import { UserRepository } from '../../respositories/user.repository'
import { CreateUserDTO } from './types/dto'
import { CreateUserResponse } from './types/response'

export const createUserService =
	(
		idGenerator: IDGenerator,
		crypto: CryptoService,
		userRepository: UserRepository,
		passwordGenerator: GetRandomPassword,
	): ApplicationService<CreateUserDTO, CreateUserResponse> =>
	async (data) => {
		const userByEmail = await userRepository.findByEmail(data.email)
		if (userByEmail) throw new BadException('Unvalid data to create user')
		const userId = await idGenerator()
		const password = await passwordGenerator()
		await userRepository.save({
			...data,
			id: userId,
			password: await crypto.encrypt(password),
		})
		return {
			id: userId,
			password,
		}
	}
