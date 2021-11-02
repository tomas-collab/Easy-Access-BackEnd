import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from '../services/users/routes.js'
import volunteerRouter from '../services/volunteers/routes.js'
import listEndpoints from 'express-list-endpoints'
import ErrorHandlers from '../lib/errorHandlers.js'
import passport from 'passport'
import { userGoogleStrategy ,volunteerGoogleStrategy} from '../auth/oauth.js'
import cookieParser from 'cookie-parser'
import {createServer} from 'http'
const server = express()

const port = process.env.PORT || 3040
passport.use('google',userGoogleStrategy)
passport.use('google',volunteerGoogleStrategy)


server.use(cors({origin:'http://localhost:3000',credentials:true}))
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())


server.use('/users',userRouter)
server.use('/volunteers',volunteerRouter)


server.use(ErrorHandlers.badRequest)
server.use(ErrorHandlers.forbidden)
server.use(ErrorHandlers.notFound)
server.use(ErrorHandlers.GeneralError)
server.use(ErrorHandlers.unauthorizedHandler)

export const httpServer = createServer(server)

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected successfully')
    httpServer.listen(port,async()=>{
        console.table(listEndpoints(server))
        console.log('server listening on port:',port)
    })
})
mongoose.connection.on('error',error=>{
    console.log('mongoose error',error)
})