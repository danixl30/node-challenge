import { Schema, model } from 'mongoose'

export const historySchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	timestamp: {
		type: Date,
	},
	symbol: {
		type: String,
	},
	open: {
		type: Number,
	},
	high: {
		type: Number,
	},
	low: {
		type: Number,
	},
	close: {
		type: Number,
	},
	volume: {
		type: Number,
	},
	name: {
		type: String,
	},
})

export const History = model('History', historySchema)
