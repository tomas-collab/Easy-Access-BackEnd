import express from 'express'
import { volunteerJWTAuthMiddleware } from '../../auth/token.js'
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
export default volunteerRouter