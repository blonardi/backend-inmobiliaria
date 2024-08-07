import mongoose from 'mongoose'


export const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},

	author: {
		type: String,
		required: true
	},
	tags: {
		type: [String]
	},
	permalink: {
		type: String,
		required: true,
		uniqe: true
	},
	date: {
		type: Date,
		required: true
	}
})

export const houseSchema = mongoose.Schema({
	permalink: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	houseImage: {
		type: String,
		required: true,
	},
	dimention: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	realEstate: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'RealEstate',
		required: true
	},
	lat: {
		type: Number,
	},
	lon: {
		type: Number,
	},
})