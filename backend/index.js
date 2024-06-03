require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db')
const userRouter = require('./routes/userRoutes')
const messageRouter = require('./routes/messageRoutes')
const {app,server} = require("./socket/socket")
const port = 3000

connectDb()

app.use(express.json())
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})