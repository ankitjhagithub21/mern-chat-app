const express = require('express')
const { register, login, logout, getOtherUsers} = require('../controllers/userController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/",isAuthenticated,getOtherUsers)

module.exports = userRouter
