import express from 'express'
import { authRoutes, taskRoutes } from './routes'
import 'reflect-metadata'
import { AppDataSource } from './data-source'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error: ErrorCallback) => console.log(error))

app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)

const serverPort = process.env.SERVER_PORT ?? 3000

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`)
})
