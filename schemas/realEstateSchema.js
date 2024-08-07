import mongoose from "mongoose";

export const realEstateSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
})