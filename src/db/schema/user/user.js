import mongoose from 'mongoose'

const {Schema,model} = mongoose

const userLoginSchema = new Schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phoneNumber:{type:String},
    googleId: { type: String },
    location:{type:Object}

},{timestamps:true})

export default model('user',userLoginSchema)