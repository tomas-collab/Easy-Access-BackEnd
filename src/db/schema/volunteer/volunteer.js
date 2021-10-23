import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const {Schema,model} = mongoose

const volunteerSchema = new Schema({
    name:{type:String,required:true},
    surname:{type:String},
    email:{type:String,required:true},
    phoneNumber:{type:String},
    password:{type:String},
    googleId: { type: String },
    location:{type:Object},

},{timestamps:true})

volunteerSchema.pre('save',async function(next){
    const volunteer = this
    const plainPw = volunteer.password
    if(volunteer.isModified('password')){
        volunteer.password = await bcrypt.hash(plainPw,12)
    }
    next()
})

volunteerSchema.methods.toJSON = function(){
    const volunteerData = this
    const volunteerObject = volunteerData.toObject()
    delete volunteerObject.password
    return volunteerObject
}

volunteerSchema.statics.checkCredentials = async function(email,plainPw){
    const volunteer = await this.findOne({email})
    if(volunteer){
        const isMatch = await bcrypt.compare(plainPw,volunteer.password)
        if(isMatch) return volunteer
        else return null
    }else{
        return null
    }
}


export default model('volunteer',volunteerSchema)