const express  = require('express')
const { sendMessage, getMessage } = require('../controllers/messageController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const messageRouter = express.Router()

messageRouter.post("/send/:id",isAuthenticated,sendMessage)
messageRouter.get("/:id",isAuthenticated,getMessage)

module.exports = messageRouter