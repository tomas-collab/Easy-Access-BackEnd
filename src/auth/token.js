import { verifyJWT } from "./tools.js";
import userModel from '../db/schema/user/user.js'
import volunteerModel from '../db/schema/volunteer/volunteer.js'
import createHttpError from "http-errors";

export const userJWTAuthMiddleware = async(req,res,next)=>{
    if(!req.headers.cookie){
        next(createHttpError(401,"yo provide credentials"))
    }else{
        try {
            const token = req.headers.cookie.replace("token=","")
            const decodedToken = await verifyJWT(token)
            const user = await userModel.findById(decodedToken._id)
            console.log('user',user)
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
export const volunteerJWTAuthMiddleware= async(req,res,next)=>{
    if(!req.headers.authorization){
        next(createHttpError(401,"yo provide credentials"))
    }else{
        try {
            const token = req.headers.authorization.replace("Bearer ","")
            const decodedToken = await verifyJWT(token)
            const volunteer= await volunteerModel.findById(decodedToken._id)
            if(volunteer){
                req.volunteer = volunteer
                next()
            }else{
                next(createHttpError(404,'user not found'))
            }
        } catch (error) {
            next(createHttpError(401,'token not valid'))
        }
    }
}
