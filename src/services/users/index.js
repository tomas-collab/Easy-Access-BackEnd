import userModel from '../../db/schema/user/user.js'

import { jwtAuth } from '../../auth/tools.js'
import createHttpError from 'http-errors'

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
const getUserMe = async(req,res,next)=>{
    try {
        console.log(req.user)
        res.status(200).send(req.user)
    } catch (error) {
        next(error)
    }
}
const updateUserMe = async(req,res,next)=>{
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
        res.send(updateUser)
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
const UserLogin = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const user = await userModel.checkCredentials(email,password)
        console.log('user',user)
        if(user){
            const accessToken = await jwtAuth(user)
            res.cookie('token',accessToken)
            res.send(accessToken)
            console.log('token',{accessToken})
        }else{
            next(createHttpError(401,'something wrong with credentials'))
        }
    } catch (error) {
        next(error)
    }
}
const UserRegister = async(req,res,next)=>{
    try {
        const newRegister = new userModel(req.body)
        const user = await newRegister.save()
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
const uploadImage = async(req, res, next) => {
    try {
      const imageUrl = req.file.path;
     
      const updateUser = await userModel.findByIdAndUpdate(
        req.user._id,
        { image: imageUrl },
        { new: true }
      )
      res.status(201).send(updateUser)
    } catch (error) {
      next(error)
    }
  }

  const getUser = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
  


export const allMethods = {
    getUser:getUser,
    getUsers:getUsers,
    postUser:postUser,
    getUserMe:getUserMe,
    updateUserMe:updateUserMe,
    deleteUserMe:deleteUserMe,
    UserLogin:UserLogin,
    UserRegister:UserRegister,
    uploadImage:uploadImage
}