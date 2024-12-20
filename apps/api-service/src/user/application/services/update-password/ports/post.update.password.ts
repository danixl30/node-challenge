import { User } from '../../../models/user'

export type PostUpdateUserPassword = (
	user: User,
	password: string,
) => Promise<void>
