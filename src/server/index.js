import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from '../services/users/routes.js'
import volunteerRouter from '../services/volunteers/routes.js'
import listEndpoints from 'express-list-endpoints'
import ErrorHandlers from '../lib/errorHandlers.js'
import passport from 'passport'
// import { userGoogleStrategy ,volunteerGoogleStrategy} from '../auth/oauth.js'
import cookieParser from 'cookie-parser'
import { createServer} from 'http'
import { Server } from 'socket.io'
import chatRouter from '../services/chat/index.js'
import messageRouter from '../services/message/index.js'
const server = express()
const port = process.env.PORT || 3030
export const httpServer = createServer(server)

// passport.use('google',userGoogleStrategy)
// passport.use('google',volunteerGoogleStrategy)


server.use(cors({origin:'https://easy-access-frontend-lqdakoxmh-tomas-collab.vercel.app',credentials:true}))
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())


server.use('/users',userRouter)
server.use('/volunteers',volunteerRouter)
server.use('/chat',chatRouter)
server.use('/messages',messageRouter)


server.use(ErrorHandlers.badRequest)
server.use(ErrorHandlers.forbidden)
server.use(ErrorHandlers.notFound)
server.use(ErrorHandlers.GeneralError)
server.use(ErrorHandlers.unauthorizedHandler)

export const io = new Server(httpServer,{allowEIO3:true})
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection',socket=>{
    console.log('socket',socket.id);

 socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  })

})


mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })
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