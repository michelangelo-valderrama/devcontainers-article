import express from 'express'
import mongoose from 'mongoose'

const Messages = mongoose.model('Messages', { txt: String })

const messagesRouter = express.Router()

messagesRouter.get('/', async (_, res) => {
  const data = await Messages.find().lean().exec()
  return res.json(data)
})

messagesRouter.post('/', async (req, res) => {
  const { txt } = req.body
  if (!txt) {
    return res.status(400).json({ error: 'txt is required' })
  }

  const data = await Messages.create({ txt })
  return res.json(data)
})

export default messagesRouter
