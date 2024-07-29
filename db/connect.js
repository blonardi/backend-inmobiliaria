import mongoose from "mongoose";


export const dbConnect = (MONGODB_URI) => {
	mongoose.connect(MONGODB_URI)
	.then(() => console.log('Conexión exitosa a MongoDB'))
	.catch(error => console.error('Error al conectar a MongoDB:', error))
}