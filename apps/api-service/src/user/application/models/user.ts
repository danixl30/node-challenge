export type User = {
	id: string
	email: string
	password: string
	role: Roles
}

export const roles = ['user', 'admin'] as const
export type Roles = (typeof roles)[number]
