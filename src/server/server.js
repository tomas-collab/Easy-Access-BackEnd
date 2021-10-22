import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from '../services/users/routes.js'
import volunteerRouter from '../services/volunteers/routes.js'
import listEndpoints from 'express-list-endpoints'
import ErrorHandlers from '../lib/errorHandlers.js'
const server = express()

const port = process.env.PORT || 3040
server.use(cors())
server.use(express.json())


server.use('/users',userRouter)
server.use('/volunteers',volunteerRouter)


server.use(ErrorHandlers.badRequest)
server.use(ErrorHandlers.forbidden)
server.use(ErrorHandlers.notFound)
server.use(ErrorHandlers.GeneralError)
server.use(ErrorHandlers.unauthorizedHandler)


mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected successfully')
    server.listen(port,async()=>{
        console.table(listEndpoints(server))
        console.log('server listening on port:',port)
    })
})
mongoose.connection.on('error',error=>{
    console.log('mongoose error',error)
})