// models/User.js
import mongoose from 'mongoose'

export const userSchema = mongoose.Schema({
	fullname: {
		type: String,
		required: [true, 'Nombre completo es requerido'],
		min: [6, 'Nombre completo debe tener al menos 6 caracteres'],
		max: [50, 'Nombre completo no debe tener mas de 50 caracteres']
	},
	email: { type: String, unique: true },
	password: {
		type: String,
		required: [true, 'Contrasena es requerida'],
		min: [6, 'Password debe tener al menos 6 caracteres'],
	},
	//image: {type: String, required: true},
	date: { type: Date, required: true }
	// Otros campos que quieras agregar
});
