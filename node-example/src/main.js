import express from 'express'
import mongoose from 'mongoose'
import { DB_URI, PORT } from './config.js'
import messageRouter from './messages.js'

// main
;(async () => {
  const app = express()

  try {
    await mongoose.connect(DB_URI)
  } catch (error) {
    console.error('Error connecting to the database: ', error)
    process.exit(1)
  }

  app.use(express.json())
  app.use('/messages', messageRouter)

  app.get('/', (_, res) => {
    res.json({ status: 'ok' })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})()
