import express from 'express'
import { userJWTAuthMiddleware } from '../../auth/token.js'
import { allMethods } from './index.js'

const userRouter = express.Router()

userRouter.route('/login')
.post(allMethods.UserLogin)

userRouter.route('/register')
.post(allMethods.UserRegister)

userRouter.route('/me')
.get(userJWTAuthMiddleware,allMethods.getUserMe)
.put(userJWTAuthMiddleware,allMethods.updateUserMe)
.delete(userJWTAuthMiddleware,allMethods.deleteUserMe)

userRouter.route('/')
.get(allMethods.getUsers)




export default userRouter