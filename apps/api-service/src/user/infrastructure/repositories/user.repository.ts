import { Types } from 'mongoose'
import type { UserRepository } from '../../application/respositories/user.repository'
import { User } from '../models/user.model'

export const userMongoRepository = (): UserRepository => ({
	async save(user) {
		await User.findOneAndUpdate(
			{
				_id: user.id,
			},
			{
				_id: new Types.ObjectId(user.id),
				password: user.password,
				email: user.email,
				role: user.role,
			},
			{
				upsert: true,
			},
		)
	},
	async findById(id) {
		const user = await User.findById(id)
		if (!user) return null
		return {
			id,
			password: user.password!,
			email: user.email!,
			role: user.role!,
		}
	},
	async findByEmail(email) {
		const user = await User.findOne({
			email,
		})
		if (!user) return null
		return {
			id: String(user.id),
			password: user.password!,
			email: user.email!,
			role: user.role!,
		}
	},
	async delete(user) {
		await User.findByIdAndDelete(user.id)
	},
})
