import express from 'express'

const volunteerRouter = express.Router()

volunteerRouter.route('/login')
.get()
volunteerRouter.route('/register')
volunteerRouter.route('/me')



export default volunteerRouter