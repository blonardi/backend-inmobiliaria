import mongoose from 'mongoose'
import { houseSchema, postSchema } from './house-schema.js'

// este House, luego se hace minusculas y se transforma en plural
export const HouseModel = mongoose.model('House', houseSchema)

export const postModel = mongoose.model('Post', postSchema, 'posts')
// Modelo, es mi objeto que tiene todos los metodos para yo poder ejecturar cosas de mongo, CRUD

// Ejemplo de modelo para post en base de datos
// const newHouse = new HouseModel({
//   price: '40000',
//   name: 'Casa Elegante en Rio Gualeguay',
//   date: new Date().toISOString(),
//   address: '25 de Mayo, 250`',
//   description: 'Gran Casa elegante a costas del rio Gualeguay, cerca del Corralito (Playa)',
//   dimention: 60,
//   type: 'Terreno',
//   location: 'Larroque',
//   realEstate: 'Perera'
// })

// newHouse.save()
//   .then(() => {
//     console.log('Documento insertado correctamente en la colección "Houses".')
//   })
//   .catch((error) => {
//     console.error('Error al insertar el documento:', error)
//   })
