import express from 'express'
import { allMethods } from './index.js'

const volunteerRouter = express.Router()

volunteerRouter.route('/login')
.post(allMethods.VolunteerLogin)

volunteerRouter.route('/register')
.post(allMethods.VolunteerRegister)

volunteerRouter.route('/me')
.get(allMethods.getVolunteerMe)
.put(allMethods.updateVolunteerMe)
.delete(allMethods.deleteVolunteerMe)

volunteerRouter.route('/me/details')
.post(allMethods.postVolunteerDetail)



export default volunteerRouter