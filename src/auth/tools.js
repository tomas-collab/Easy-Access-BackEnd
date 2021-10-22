import { Jwt } from "jsonwebtoken";
import userModel from '../db/schema/user/user.js'


const generateJWT = payload=>
    new Promise((resolve,reject)=>
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err) reject(err)
               resolve(token)
        })
    )

const generateRefreshJWT = payload=>
     new Promise((resolve,reject)=>
       jwt.sign(payload,process.env.JWT_REFRESH_SECRET,(err,token)=>{
           if(err) reject(err)
               resolve(token)
       })
     )


export const verifyJWT = token=>
       new Promise((resolve,reject)=>
       jwt.verify(payload,process.env.JWT_SECRET,(err,decodedToken)=>{
           if(err) reject(err)
               resolve(decodedToken)
       }))

const verifyRefreshToken = token=>
       new Promise((resolve,reject)=>
       jwt.verify(payload,process.env.JWT_REFRESH_SECRET,(err,decodedToken)=>{
           if(err) reject(err)
                 resolve(decodedToken)
       }))


export const jwtAuth = async user =>{
    const accessToken = await generateJWT({_id:user.id})
    const refreshToken = await generateRefreshJWT({_id:user.id})

    user.refreshToken = refreshToken
    await user.save()
    return({accessToken,refreshToken})
}