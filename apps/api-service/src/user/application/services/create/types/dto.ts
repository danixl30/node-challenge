import { Roles } from '../../../models/user'

export type CreateUserDTO = {
	email: string
	role: Roles
}
