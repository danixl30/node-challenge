import { Optional } from '../../../utils/types/optional'
import { User } from '../models/user'

export type UserRepository = {
	save(user: User): Promise<void>
	delete(user: User): Promise<void>
	findByEmail(email: string): Promise<Optional<User>>
	findById(id: string): Promise<Optional<User>>
}
