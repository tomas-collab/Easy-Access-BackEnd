import mongoose from 'mongoose'

const {Schema,model} = mongoose

const messageSchema = new Schema({
    text: { type: String, required: true },
    sender: { type: String, required: true },
    id: { type: String, required: true },
    timestamp: { type: Number, required: true }
})
export default model('message',messageSchema)