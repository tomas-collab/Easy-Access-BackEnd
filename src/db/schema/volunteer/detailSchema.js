import mongoose from 'mongoose'

const {Schema,model} = mongoose
const VolunteerSchema = new Schema({
    name:{type:String,required},
    phoneNumber:{type:Number},
    location:{type:Object}
},{timestamps:true})

export default model('volunteer',VolunteerSchema)