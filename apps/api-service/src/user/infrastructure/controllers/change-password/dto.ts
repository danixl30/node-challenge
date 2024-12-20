import { z } from 'zod'

export const changeUserPasswordSchema = z.object({
	email: z.string().email(),
})
