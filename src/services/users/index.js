import userModel from '../../db/schema/user/user.js'

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
        
    } catch (error) {
        next(error)
    }
}
const getUserMe= async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const updateUserMe = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const deleteUserMe = async(req,res,next)=>{
    try {
        
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