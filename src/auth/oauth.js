import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import userModel from '../db/schema/user/user.js'


const googleStrategy = new GoogleStrategy({
    clientId:process.env.GOOGLE_OAUTH_ID,
    clientSecret:process.env.GOOGLE_OAUTH_SECRET,
    callbackUrl:`${process.env.API_URL}:${process.env.PORT}/users/googleRedirect`,
},
async(accessToken,refreshToken,profile,passportNext)=>{
    try {
        const user = await userModel.findOne({googleId:profile.id})
        if(user){
            const tokens = awaut jwt
        }
    } catch (error) {
        
    }
}
)
