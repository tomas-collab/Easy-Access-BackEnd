import { Server } from "socket.io";
import { httpServer } from "../../server/server";


const io = new Server(httpServer,{allowEIO3:true})

io.on('connection',socket=>{

})