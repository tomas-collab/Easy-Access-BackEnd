import volunteerModel from '../../db/schema/volunteer/volunteer.js'

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
        req.user = user
    } catch (error) {
        next(error)
    }
}
const updateVolunteerMe = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const deleteVolunteerMe = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const postVolunteerDetail = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const VolunteerLogin = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const VolunteerRegister = async(req,res,next)=>{
    try {
        
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
    postVolunteerDetail:postVolunteerDetail,
    VolunteerLogin:VolunteerLogin,
    VolunteerRegister:VolunteerRegister
}