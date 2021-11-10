import express from 'express'
import multer from 'multer'
import { volunteerJWTAuthMiddleware } from '../../auth/token.js'
import { saveToVolunteer } from '../../lib/cloudinaryTool.js'
import { allMethods } from './index.js'


const volunteerRouter = express.Router()

volunteerRouter.route('/login')
.post(allMethods.VolunteerLogin)

volunteerRouter.route('/register')
.post(allMethods.VolunteerRegister)

volunteerRouter.route('/me')
.get(volunteerJWTAuthMiddleware,allMethods.getVolunteerMe)
.put(volunteerJWTAuthMiddleware,allMethods.updateVolunteerMe)
.delete(volunteerJWTAuthMiddleware,allMethods.deleteVolunteerMe)

volunteerRouter.route('/')
.get(allMethods.getVolunteers)

volunteerRouter.route('/:id')
.get(allMethods.getvolunteer)

volunteerRouter
  .route("/me/imageUpload")
  .put(volunteerJWTAuthMiddleware,multer({ storage: saveToVolunteer }).single("avatar"), allMethods.uploadImage)

export default volunteerRouter