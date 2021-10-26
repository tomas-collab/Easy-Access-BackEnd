import { jwtAuth } from '../../auth/tools.js'
import volunteerModel from '../../db/schema/volunteer/volunteer.js'
import createHttpError from 'http-errors'

const getVolunteers = async(req,res,next)=>{
    try {
        const volunteers = await volunteerModel.find()
        res.status(200).send(volunteers)
    } catch (error) {
        next(error)
    }
}
const postVolunteer = async(req,res,next)=>{
    try {
        const newVolunteer = new volunteerModel(req.body)
        const volunteer = await newVolunteer.save()
        res.status(201).send(volunteer)
    } catch (error) {
        next(error)
    }
}
const getVolunteerMe= async(req,res,next)=>{
    try {
        res.status(200).send(req.volunteer)
    } catch (error) {
        next(error)
    }
}
const updateVolunteerMe = async(req,res,next)=>{
    try {
        const updateVolunteer = await volunteerModel.findByIdAndUpdate(req.volunteer._id,req.body,{new:true})
        res.send(updateVolunteer)
    } catch (error) {
        next(error)
    }
}
const deleteVolunteerMe = async(req,res,next)=>{
    try {
        const deleteVolunteer = await volunteerModel.findByIdAndDelete(req.volunteer._id)
        res.send('deleted')
    } catch (error) {
        next(error)
    }
}
const VolunteerLogin = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const volunteer = await volunteerModel.checkCredentials(email,password)
        if(volunteer){
            const accessToken = await jwtAuth(volunteer)
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
const VolunteerRegister = async(req,res,next)=>{
    try {
        const newVolunteer = new volunteerModel(req.body)
        const volunteer = await newVolunteer.save()
        res.send(volunteer)
    } catch (error) {
        next(error)
    }
}
export const allMethods = {
    getVolunteers:getVolunteers,
    postVolunteer:postVolunteer,
    getVolunteerMe:getVolunteerMe,
    updateVolunteerMe:updateVolunteerMe,
    deleteVolunteerMe:deleteVolunteerMe,
    VolunteerLogin:VolunteerLogin,
    VolunteerRegister:VolunteerRegister
}