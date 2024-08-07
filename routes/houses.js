import express from 'express'
// import mongoose from 'mongoose'
import { getAllHouses, getHouseByPermalink, postHouse, updateHouse, deleteHouse, getTypesRealEstate, getRealEstates, getLocations } from '../controllers/houses.js'
export const houseRouter = express.Router()
import upload from '../middlewares/multerConfig.js';
//import uploadToCloudinary from '../middlewares/cloudinaryMiddleware';


//import multer from 'multer';
//const upload = multer({ dest: '../uploads/' })
// export const postRouter = express.Router()
// CRUD: create,read,update,delete

// Create
// houseRouter.post('/', async (req, res) => {
//   // const createdHouse = await houseModel.create(req.body)
//   // res.status(201).json({ house: createdHouse })
// })

// postRouter.get('/', async (req, res) => {
//   const posts = await postModel.find({}).limit(10)
//   res.status(200).json({ posts })
// }
// )

// postRouter.get('/:permalink', async (req, res) => {
//   const post = await postModel.findOne({ permalink: req.params.permalink })
//   res.status(200).json(post)
// })

// Read TypeInmueble
houseRouter.get('/typesestate', getTypesRealEstate)

// Read RealEstates
houseRouter.get('/realestates', getRealEstates)

// Read Locations
houseRouter.get('/locations', getLocations)

// Read
//houseRouter.get('/', async (req, res) => {
//  try {
//    const houses = await HouseModel.find({}).sort({ date: -1 })
//    res.status(200).json(houses)
//  } catch (error) {
//		res.status(500).json({message: error.message})
//    console.log(error)
//  }
//})
houseRouter.get('/', getAllHouses)

// ReadOneByPermalink
houseRouter.get('/:permalink', getHouseByPermalink)

// POST
houseRouter.post('/', upload.single('houseImage'), postHouse)

// Update
//houseRouter.patch('/:permalink', upload.single('houseImage'), uploadToCloudinary, updateHouse)

// Delete
houseRouter.delete('/:permalink', deleteHouse)
