import mongoose from 'mongoose'

const {Schema,model} = mongoose
const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default model("Chat", ChatSchema);
