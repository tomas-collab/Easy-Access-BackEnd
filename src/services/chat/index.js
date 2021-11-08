
import express from 'express'
import chatSchema from '../../db/schema/chat/chat.js'


const chatRouter = express.Router()
//new conv

chatRouter.post("/", async (req, res) => {
  const newConversation = new chatSchema({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get conv of a user

chatRouter.get("/:userId", async (req, res) => {
  try {
    const conversation = await chatSchema.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
});


export default chatRouter
