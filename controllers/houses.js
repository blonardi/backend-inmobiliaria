import { HouseModel } from '../models/house-model.js'
import { v4 as uuidv4 } from 'uuid'
import { fetchCoordinates } from '../utils/fetchCoordinates.js';


//export const getAllHouses = async (req, res) => {
//  try {
//    const page = parseInt(req.query.page) || 1;
//    const limit = parseInt(req.query.limit) || 8;
//    const skip = (page - 1) * limit;

//    const houses = await HouseModel.find({})
//      .sort({ date: -1 })
//      .skip(skip)
//      .limit(limit);

//    const totalHouses = await HouseModel.countDocuments();
//    const totalPages = Math.ceil(totalHouses / limit);

//    if (houses.length === 0) {
//      return res.status(204).json([]);
//    }

//    res.json({
//      houses,
//      totalPages,
//    });
//  } catch (error) {
//    res.status(500).json({ message: error.message });
//  }
//};

export const getAllHouses = async (req, res) => {
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
}

export const getHouseByPermalink = async (req, res, next) => {
	const { permalink } = req.params
	try {
		const house = await HouseModel.findOne({ permalink })
		res.status(200).json(house)
	} catch (err) {
		next(err)
	}
}

//export const postHouse = async (req, res) => {
//	const { title, address, location, type, realEstate, price, description, houseImage, dimention } = req.body;
//	const state = 'Entre Rios';

//	try {
//		// Generar UUID y fecha
//		const uuid = uuidv4();
//		const permalink = uuid.slice(0, 8);
//		const date = new Date().toISOString();

//		// Hacer la petición a Nominatim para obtener las coordenadas
//		const response = await axios.get(
//			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//				`${address}, ${location}, ${state}`
//			)}`
//		);

//		const data = response.data;

//		let lat = null;
//		let lon = null;

//		if (data.length > 0) {
//			lat = data[0].lat;
//			lon = data[0].lon;
//		}

//		// Crear el objeto del inmueble con las coordenadas y otros datos
//		const houseToSave = {
//			title,
//			address,
//			location,
//			type,
//			realEstate,
//			price,
//			description,
//			houseImage,
//			dimention,
//			permalink,
//			date,
//			lat,
//			lon,
//		};

//		// Guardar el inmueble en la base de datos
//		const createdHouse = await House.create(houseToSave);
//		res.status(201).send(createdHouse);
//	} catch (error) {
//		res.status(400).json({
//			message: error.message,
//		});
//		console.log(error);
//	}
//}

// controllers/housesController.js
// controllers/housesController.js

export const postHouse = async (req, res) => {
	try {
		const uuid = uuidv4();
		const permalink = uuid.slice(0, 8);
		const date = new Date().toISOString();
		const { address, location, state = 'Entre Rios', ...rest } = req.body;

		// Obtener las coordenadas de Nominatim
		const coordinates = await fetchCoordinates(address, location, state);

		const houseToSave = {
			...rest,
			address,
			location,
			date,
			permalink,
			...(coordinates && { lat: coordinates.lat, lon: coordinates.lon })
		};

		const createdPost = await HouseModel.create(houseToSave);
		res.status(201).send(createdPost);
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
		console.error(error);
	}
};


export const updateHouse = async (req, res) => {
	try {
		const { permalink } = req.params;
		const { price, title, address, description, houseImage, dimention, type, location, realEstate } = req.body;
		const date = new Date().toISOString();
		const state = 'Entre Rios';

		// Obtener las coordenadas de Nominatim
		const coordinates = await fetchCoordinates(address, location, state);

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
			realEstate,
			...(coordinates && { lat: coordinates.lat, lon: coordinates.lon })
		};

		const opts = { new: true };
		const updatedHouse = await HouseModel.findOneAndUpdate({ permalink }, newHouse, opts);
		res.status(200).json({ updatedHouse });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error al actualizar la casa' });
	}
};


export const deleteHouse = async (req, res, next) => {
	try {
		const deletedHouse = await HouseModel.findOneAndDelete({ permalink: req.params.permalink })
		res.status(200).json(deletedHouse)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

export const getTypesRealEstate = async (req, res) => {
	try {
		// Obtener todas las casas
		const houses = await HouseModel.find({})

		// Extraer el campo 'location' de cada casa y eliminar duplicados
		const uniqueTypeEstates = Array.from(new Set(houses.map(house => house.type)))

		console.log('Tipos obtenidas:', uniqueTypeEstates)
		res.status(200).json(uniqueTypeEstates)
	} catch (err) {
		console.error(err)
		res.status(500).send('Error en el servidor')
	}
}

export const getRealEstates = async (req, res) => {
	try {
		// Obtener todas las casas
		const houses = await HouseModel.find({})

		// Extraer el campo 'location' de cada casa y eliminar duplicados
		const uniqueRealEstates = Array.from(new Set(houses.map(house => house.realEstate)))

		console.log('Inmobiliarias obtenidas:', uniqueRealEstates)
		res.status(200).json(uniqueRealEstates)
	} catch (err) {
		console.error(err)
		res.status(500).send('Error en el servidor')
	}
}

export const getLocations = async (req, res) => {
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
}