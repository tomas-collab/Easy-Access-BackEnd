import express from 'express'
import { allMethods } from './index.js'

const userRouter = express.Router()

userRouter.route('/login')
.post(allMethods.UserLogin)

userRouter.route('/register')
.post(allMethods.UserRegister)

userRouter.route('/me')
.get(allMethods.getUserMe)
.put(allMethods.updateUserMe)
.delete(allMethods.deleteUserMe)

userRouter.route('/me/details')
.post(allMethods.postUserDetail)



export default userRouter