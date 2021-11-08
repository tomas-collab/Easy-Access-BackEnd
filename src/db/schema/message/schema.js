import mongoose from 'mongoose'

const {Schema,model} = mongoose

const messageSchema = new Schema(
    {
        chatId: {
          type: String,
        },
        sender: {
          type: String,
        },
        text: {
          type: String,
        },
      },
      { timestamps: true }
    );

export default model('message',messageSchema)