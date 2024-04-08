import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
//import bodyParser from 'body-parser'
import cors from 'cors'
import { houseRouter } from './houses/router.js'
import { notFound } from './middlewares/notFound.js'
import { handleErrors } from './middlewares/handleErrors.js'
dotenv.config()

const { MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DATABASE } = process.env
const PORT = process.env.PORT || MONGO_PORT
const MONGO_URL=`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/?retryWrites=true&w=majority`

const app = express()
app.use(cors())
// permite poder recibir peticiones en el body tipo json, para enviar json desde curl x ej
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`)
  next()
})

// Middlewares
//app.use(bodyParser.json())
app.use(express.json()) // parsea bodies

// Routes
app.get('/', (req, res) => {
  res.send('MONGOOSE API IS RUNNING')
})

app.use('/api/houses', houseRouter)
// app.use('/posts', postRouter)
app.use(notFound)

app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
  mongoose.connect(MONGO_URL, {
    dbName: MONGO_DATABASE
  }).then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error))
})
