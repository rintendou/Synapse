import { Request, Response } from "express"

import MessageModel from "../models/Message"

export const createMessage = async (req: Request, res: Response) => {
  /* 
    Creates a new message with the MessageModel.
    Message is creating using the entire body of the request.
    The request contains the following keys: {
        "chatId": ... , 
        "sender": ... , 
        "text": ... 
    }
    */

  const newMessage = new MessageModel(req.body)

  try {
    const savedMessaged = await newMessage.save()
    return res.status(200).json({
      message: "Message successfully created!",
      data: savedMessaged,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const getMessages = async (req: Request, res: Response) => {
  /* 
    Retreive all messages using a given chatId via the MessageModel.
    */

  try {
    const allMessages = await MessageModel.find({
      chatId: req.params.chatId,
    })
    return res.status(200).json({
      message: "All messages successfully created!",
      data: allMessages,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
