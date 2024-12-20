import { z } from 'zod'
import { roles } from '../../../application/models/user'

export const createUserSchema = z.object({
	email: z.string().email(),
	role: z.enum(roles),
})
