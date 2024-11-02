import express from 'express'
import path from 'path'

import router from './routes'
import { config } from './config/config'
import { connection } from './database/connection'

const app = express()

// Middleware
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')))
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

connection()

// Routes
app.use('/', router)

// Start Server
app.listen(config.DB_PORT, () => {
  console.log(`Server is running on http://localhost:${config.DB_PORT}`)
})
