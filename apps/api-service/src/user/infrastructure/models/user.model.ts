import { Schema, model } from 'mongoose'
import { roles } from '../../application/models/user'

export const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		null: false,
	},
	password: {
		type: String,
		null: false,
	},
	role: {
		type: String,
		enum: roles,
		null: false,
	},
})

export const User = model('User', userSchema)
