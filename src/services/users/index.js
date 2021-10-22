import userModel from '../../db/schema/user/user.js'
import { JWTAuthMiddleware } from '../../auth/token.js'

const getUsers = async(req,res,next)=>{
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}
const postUser = async(req,res,next)=>{
    try {
        const newUser = new userModel(req.body)
        const user = await newUser.save()
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
const getUserMe= async(JWTAuthMiddleware,req,res,next)=>{
    try {
        res.status(200).send(req.user)
    } catch (error) {
        next(error)
    }
}
const updateUserMe = async(JWTAuthMiddleware,req,res,next)=>{
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
        res.status(204).send(updateUser)
    } catch (error) {
        next(error)
    }
}
const deleteUserMe = async(req,res,next)=>{
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.user._id)
        res.status(202).send('deleted')
    } catch (error) {
        next(error)
    }
}
const postUserDetail = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const UserLogin = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const UserRegister = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}


export const allMethods = {
    getUsers:getUsers,
    postUser:postUser,
    getUserMe:getUserMe,
    updateUserMe:updateUserMe,
    deleteUserMe:deleteUserMe,
    postUserDetail:postUserDetail,
    UserLogin:UserLogin,
    UserRegister:UserRegister
}