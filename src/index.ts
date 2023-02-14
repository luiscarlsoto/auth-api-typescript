import express from 'express'
import { authRoutes } from './routes'
import 'reflect-metadata'
import { AppDataSource } from './data-source'

const app = express()

app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error: ErrorCallback) => console.log(error))

app.use('/api/auth', authRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
