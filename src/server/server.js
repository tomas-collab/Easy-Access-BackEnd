import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from '../services/users/routes.js'
import volunteerRouter from '../services/volunteers/routes.js'
const server = express()

server.use(cors())
server.use(express.json())


server.use('/users',userRouter)
server.use('/volunteers',volunteerRouter)



mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connection',()=>{
    console.log('mongoose connected')
})
mongoose.connection.on('error',error=>{
    console.log('mongoose error',error)
})