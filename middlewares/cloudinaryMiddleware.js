//import cloudinary from '../cloudinaryConfig.js';

//export const uploadToCloudinary = (req, res, next) => {
//	console.log(req.file)
//	if (req.file) {
//		cloudinary.uploader.upload(req.file.path, (error, result) => {
//			if (error) {
//				console.error('Error al subir a Cloudinary:', error);
//				return res.status(500).json({ error: 'Error al subir la imagen' });
//			}
//			req.file.cloudinaryUrl = result.secure_url;
//			next();
//		});
//	} else {
//		next();
//	}
//};

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//////////


const uploadToCloudinary = async (req, res, next) => {
	console.log('Entrando en uploadToCloudinary');
	console.log('req.file:', req.file);

	if (!req.file) {
		console.log('No se encontró ningún archivo');
		return next();
	}

	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		console.log('Imagen subida exitosamente a Cloudinary');
		console.log('URL de Cloudinary:', result.secure_url);
		req.file.cloudinaryUrl = result.secure_url;
		next();
	} catch (error) {
		console.error('Error detallado de Cloudinary:', JSON.stringify(error, null, 2));
		res.status(500).json({ error: 'Error al subir la imagen a Cloudinary', details: error });
	}
};


export default { cloudinary, uploadToCloudinary }