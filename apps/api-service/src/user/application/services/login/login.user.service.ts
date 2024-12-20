import { CryptoService } from '../../../../core/application/crypto.service'
import { BadException } from '../../../../core/application/exceptions/bad.exception'
import { ApplicationService } from '../../../../core/application/service'
import { TokenService } from '../../../../core/application/token.service'
import { TokenPayload } from '../../models/token.payload'
import { UserRepository } from '../../respositories/user.repository'
import { LoginUserDTO } from './types/dto'

export const loginUserService =
	(
		userRepository: UserRepository,
		cryptoService: CryptoService,
		tokenService: TokenService<TokenPayload>,
	): ApplicationService<LoginUserDTO, string> =>
	async (data) => {
		const user = await userRepository.findByEmail(data.email)
		if (
			!user ||
			!(await cryptoService.compare(data.password, user.password))
		)
			throw new BadException('Unvalid credentials')
		return tokenService.sign({
			id: user.id,
		})
	}
