import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import userModel from '../db/schema/user/user.js'
import volunteerModel from '../db/schema/volunteer/volunteer.js'
import { jwtAuth } from './tools.js'


export const userGoogleStrategy = new GoogleStrategy({
    clientId:process.env.GOOGLE_OAUTH_ID,
    clientSecret:process.env.GOOGLE_OAUTH_SECRET,
    callbackUrl:`${process.env.API_URL}:${process.env.PORT}/users/googleRedirect`,
},
async(accessToken,refreshToken,profile,passportNext)=>{
    try {
        const user = await userModel.findOne({googleId:profile.id})
        if(user){
            const tokens = await jwtAuth(user)
            passportNext(null,{tokens})
        }else{
            const newUser = {
                name:profile.name.givenName,
                surname:profile.name.surname,
                email:profile.emails[0].value,
                googleId:profile.id
            }
            const createUser = new userModel(newUser)
            const saveUser = createUser.save()
            const tokens = await jwtAuth(saveUser)
            passportNext(null,{user:saveUser,tokens})
        }
    } catch (error) {
        passportNext(error)
    }})

export const volunteerGoogleStrategy = new GoogleStrategy({
    clientId:process.env.GOOGLE_OAUTH_ID,
    clientSecret:process.env.GOOGLE_OAUTH_SECRET,
    callbackUrl:`${process.env.API_URL}:${process.env.PORT}/volunteers/googleRedirect`,
},
async(accessToken,refreshToken,profile,passportNext)=>{
    try {
        const user = await volunteerModel.findOne({googleId:profile.id})
        if(user){
            const tokens = await jwtAuth(user)
            passportNext(null,{tokens})
        }else{
            const newVolunteer = {
                name:profile.name.givenName,
                surname:profile.name.surname,
                email:profile.emails[0].value,
                googleId:profile.id
            }
            const createVolunteer = new volunteerModel(newVolunteer)
            const saveVolunteer = createVolunteer.save()
            const tokens = await jwtAuth(saveVolunteer)
            passportNext(null,{volunteer:saveVolunteer,tokens})
        }
    } catch (error) {
        passportNext(error)
    }})
    passport.serializeUser(function(user,passportNext){
        passportNext(null,user)
    })



