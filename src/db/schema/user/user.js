import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const {Schema,model} = mongoose

const userSchema = new Schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    description:{type:String},
    phoneNumber:{type:String},
    googleId: { type: String },
    location:{type:Object}

},{timestamps:true})

  userSchema.pre('save',async function(next){
      const user = this
      const plainPw = user.password
      if(user.isModified('password')){
          user.password = await bcrypt.hash(plainPw,12)
      }
      next()
  })

  userSchema.methods.toJSON = function(){
      const userData = this
      const userObject = userData.toObject()
      delete userObject.password
      return userObject
  }

  userSchema.statics.checkCredentials = async function(email,plainPw){
      const user = await this.findOne({email})
      if(user){
          const isMatch = await bcrypt.compare(plainPw,user.password)
          if(isMatch) return user
          else return null
      }else{
          return null
      }
  }


export default model('user',userSchema)