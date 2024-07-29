import dotenv from 'dotenv'
import express from 'express'
//import bodyParser from 'body-parser'
import { dbConnect } from './db/connect.js'
import cors from 'cors'
import { houseRouter } from './routes/houses.js'
import { notFound } from './middlewares/notFound.js'
import { handleErrors } from './middlewares/handleErrors.js'
import { userRouter } from './routes/users.js'

dotenv.config()
const {MONGODB_URI, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DATABASE } = process.env
const PORT = process.env.PORT
//const MONGODB_URI= `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/inmobiliariasdb?retryWrites=true&w=majority&appName=Cluster0`

dbConnect(MONGODB_URI)


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
app.use('/auth', userRouter)
app.use('/api/houses', houseRouter)
app.use(notFound)
app.use(handleErrors)



app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
