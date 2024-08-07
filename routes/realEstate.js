import express from 'express'
import { deleteRealEstate, getAllRealEstates, postRealEstate, updateRealEstate } from '../controllers/realEstates.js'

export const realEstateRouter = express.Router()

realEstateRouter.get('/', getAllRealEstates)
realEstateRouter.post('/', postRealEstate)
realEstateRouter.patch('/:id', updateRealEstate)
realEstateRouter.delete('/:id', deleteRealEstate)