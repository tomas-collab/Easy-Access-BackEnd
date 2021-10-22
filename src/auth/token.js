import { verifyJWT } from "./tools";
import userModel from '../db/schema/user/user.js'
import createHttpError from "http-errors";

export const JWTAuthMiddleware= async(req,res,next)=>{
    if(!req.headers.authorization){
        next(createHttpError(401,"yo provide credentials"))
    }else{
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const decodedToken = await verifyJWT(token)
            const user = await userModel.findById(decodedToken._id)
            if(user){
                req.user = user
                next()
            }else{
                next(createHttpError(404,'user not found'))
            }
        } catch (error) {
            next(createHttpError(401,'token not valid'))
        }
    }
}