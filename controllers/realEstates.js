import mongoose from 'mongoose'
import { RealEstateModel } from '../models/realEstate-model.js'

// Obtener todas las inmobiliarias
export const getAllRealEstates = async (req, res) => {
	try {
		const realEstates = await RealEstateModel.find({}).sort({ date: -1 })
		if (realEstates.length === 0) {
			return res.status(204).json([])
		}
		res.status(200).json(realEstates)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Crear una nueva inmobiliaria
export const postRealEstate = async (req, res) => {
	const createdRealEstate = req.body
	console.log(createdRealEstate)
	try {
		const newRealEstate = await RealEstateModel.create(createdRealEstate)
		res.status(201).json(newRealEstate)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Actualizar una inmobiliaria por ID
export const updateRealEstate = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: 'ID de inmobiliaria no válido' })
	}
	try {
		const updatedRealEstate = await RealEstateModel.findByIdAndUpdate(id, req.body, { new: true })
		if (!updatedRealEstate) {
			return res.status(404).json({ message: 'Inmobiliaria no encontrada' })
		}
		res.status(200).json(updatedRealEstate)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Eliminar una inmobiliaria por ID
export const deleteRealEstate = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: 'ID de inmobiliaria no válido' })
	}
	try {
		const deletedRealEstate = await RealEstateModel.findByIdAndDelete(id)
		if (!deletedRealEstate) {
			return res.status(404).json({ message: 'Inmobiliaria no encontrada' })
		}
		res.status(200).json({ message: 'Inmobiliaria eliminada correctamente' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}