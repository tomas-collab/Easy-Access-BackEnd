
import express from 'express'
import messagesModel from '../../db/schema/message/schema.js'

const messageRouter = express.Router()
//add
messageRouter.post("/", async (req, res) => {
  const newMessage = new messagesModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get

messageRouter.get("/:chatId", async (req, res) => {
  try {
    const messages = await messagesModel.find({
      chatId: req.params.chatId,
    });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default messageRouter