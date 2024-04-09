import express from 'express'
// import mongoose from 'mongoose'
import { HouseModel } from './house-model.js'
import { v4 as uuidv4 } from 'uuid'

export const houseRouter = express.Router()

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
houseRouter.get('/typesestate', async (req, res) => {
  try {
    // Obtener todas las casas
    const houses = await HouseModel.find({})

    // Extraer el campo 'location' de cada casa y eliminar duplicados
    const uniqueTypeEstates = Array.from(new Set(houses.map(house => house.type)))

    console.log('Ciudades obtenidas:', uniqueTypeEstates)
    res.status(200).json(uniqueTypeEstates)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error en el servidor')
  }
})

// Read RealEstates
houseRouter.get('/realestates', async (req, res) => {
  try {
    // Obtener todas las casas
    const houses = await HouseModel.find({})

    // Extraer el campo 'location' de cada casa y eliminar duplicados
    const uniqueRealEstates = Array.from(new Set(houses.map(house => house.realEstate)))

    console.log('Ciudades obtenidas:', uniqueRealEstates)
    res.status(200).json(uniqueRealEstates)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error en el servidor')
  }
})
// Read Locationes
houseRouter.get('/locations', async (req, res) => {
  try {
    // Obtener todas las casas
    const houses = await HouseModel.find({})

    // Extraer el campo 'location' de cada casa y eliminar duplicados
    const uniqueLocations = Array.from(new Set(houses.map(house => house.location)))

    console.log('Ciudades obtenidas:', uniqueLocations)
    res.status(200).json(uniqueLocations)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error en el servidor')
  }
})

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
houseRouter.get('/', async (req, res) => {
	try {
		const houses = await HouseModel.find({}).sort({ date: -1 });
		console.log('GET ALL', houses)
		if (houses.length === 0) {
				return res.status(204).json([])
		}
		res.json(houses)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// ReadByName
houseRouter.get('/name', async (req, res) => {
  try {
    const houses = await HouseModel.find({ name: req.params.name })
    res.status(200).json(houses)
  } catch (err) {
    console.log(err)
  }
})
// ReadOneByPermalink
houseRouter.get('/:permalink', async (req, res, next) => {
  const { permalink } = req.params
  try {
    const house = await HouseModel.findOne({ permalink })
    res.status(200).json(house)
  } catch (err) {
    next(err)
  }
})

// Get cities to select.
// houseRouter.get('/cities', async (req, res) => {
//  try {
//    const cities = await HouseModel.distinct('location')
//    res.status(200).json(cities)
//  } catch (err) {
//    console.error(err)
//  }
// })

// POST
houseRouter.post('/', async (req, res) => {
  try {
    const uuid = uuidv4()
    const permalink = uuid.slice(0, 8)
    const date = new Date().toISOString()

    const houseToSave = { ...req.body, date, permalink }
    const createdPost = await HouseModel.create(houseToSave)
    res.status(201).send(createdPost)
  } catch (error) {
		res.status(400).json({
			message: error.message
		})
    console.log(error)
  }
})

// Update
houseRouter.patch('/:permalink', async (req, res) => {
  try {
    const { permalink } = req.params
    const { price, title, address, description, houseImage, dimention, type, location, realEstate } = req.body
    // const data = req.body probar pasando data y date en vez de todos los nombres serparados
    const date = new Date().toISOString()
    const opts = { new: true }
    const newHouse = {
      price,
      title,
      address,
      date,
      description,
      houseImage,
      dimention,
      type,
      location,
      realEstate
    }
    const updatedHouse = await HouseModel.findOneAndUpdate({ permalink }, newHouse, opts)
    res.status(200).json({ updatedHouse })
  } catch (err) {
    console.error(err)
  }
})

// Delete
houseRouter.delete('/:permalink', async (req, res, next) => {
  try {
    const deletedHouse = await HouseModel.findOneAndDelete({ permalink: req.params.permalink })
    res.status(200).json(deletedHouse)
  } catch (err) {
    console.log(err)
    next(err)
  }
})
