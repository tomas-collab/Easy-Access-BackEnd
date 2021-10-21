import mongoose from 'mongoose'

const {Schema,model} = mongoose

const volunteerLoginSchema = new Schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    googleId: { type: String },

},{timestamps:true})

export default model('volunteer',volunteerLoginSchema)