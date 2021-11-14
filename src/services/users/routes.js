import express from 'express'
import { userJWTAuthMiddleware } from '../../auth/token.js'
import { allMethods } from './index.js'
import { saveToUser } from '../../lib/cloudinaryTool.js'
import multer from 'multer'
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

userRouter.route('/:id')
.get(allMethods.getUser)
userRouter
  .route("/me/imageUpload")
  .put(userJWTAuthMiddleware,multer({ storage: saveToUser }).single("avatar"), allMethods.uploadImage)

userRouter.route('/logout')
.get((res,req)=>{
  res.clearCookie('token').status(200).send();
})


export default userRouter