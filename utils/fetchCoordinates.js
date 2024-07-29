// utils/nominatimUtils.js
import axios from 'axios';

export const fetchCoordinates = async (address, location, state) => {
	try {
		const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${address}, ${location}, ${state}`)}`);
		const coordinates = response.data.length > 0 ? response.data[0] : null;
		if (coordinates) {
			return { lat: parseFloat(coordinates.lat), lon: parseFloat(coordinates.lon) };
		} else {
			console.log('No se encontraron coordenadas');
			return null;
		}
	} catch (error) {
		console.error('Error al obtener coordenadas:', error);
		return null;
	}
};
