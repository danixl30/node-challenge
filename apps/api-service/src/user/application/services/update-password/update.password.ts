import { CryptoService } from '../../../../core/application/crypto.service'
import { GetRandomPassword } from '../../../../core/application/random.password'
import { ApplicationService } from '../../../../core/application/service'
import { UserRepository } from '../../respositories/user.repository'
import { PostUpdateUserPassword } from './ports/post.update.password'
import { UpdateUserPasswordDTO } from './types/dto'

export const updateUserPassword =
	(
		userRepository: UserRepository,
		randomPassword: GetRandomPassword,
		crypto: CryptoService,
		postUpdatePassword: PostUpdateUserPassword[],
	): ApplicationService<UpdateUserPasswordDTO, void> =>
	async (data) => {
		const user = await userRepository.findByEmail(data.email)
		if (!user) return
		const password = await randomPassword()
		user.password = await crypto.encrypt(password)
		await userRepository.save(user)
		await Promise.all(postUpdatePassword.map((e) => e(user, password)))
	}
