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

  // Destucture the payload attached to the body and params
  const { chatId, sender, text } = req.body

  // Check if payload data is complete
  if (!chatId || !sender || !text) {
    return res.status(400).json({
      message: "chatId, sender, and text properties are required!",
      data: null,
      ok: false,
    })
  }

  const newMessage = new MessageModel({ chatId, sender, text })

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

  // Destucture the payload attached to the body and params
  const { chatId } = req.body

  // Check if payload data is complete
  if (!chatId) {
    return res.status(400).json({
      message: "chatId property is required!",
      data: null,
      ok: false,
    })
  }

  try {
    const allMessages = await MessageModel.find({
      chatId: req.params.chatId,
    })
    return res.status(200).json({
      message: "All messages successfully fetched!",
      data: allMessages,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
