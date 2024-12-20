import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import { ApplicationService } from '../../../../core/application/service'
import { User } from '../../models/user'
import { UserRepository } from '../../respositories/user.repository'
import { GetCurrentUserDTO } from './types/dto'

export const getCurrentUserService =
	(
		userRepository: UserRepository,
	): ApplicationService<GetCurrentUserDTO, User> =>
	async (data) => {
		const user = await userRepository.findById(data.id)
		if (!user) throw new NotFoundException('User not found')
		return {
			...user,
			password: '',
		}
	}
