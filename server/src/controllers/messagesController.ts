import { Request, Response } from "express"
import mongoose from "mongoose"

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
  const { chatId, senderId, text } = req.body

  // Check if payload data is complete
  if (!chatId || !senderId || !text) {
    return res.status(400).json({
      message: "chatId, sender, and text properties are required!",
      data: null,
      ok: false,
    })
  }

  // Check if chatId and senderId are valid ObjectId types
  if (
    !mongoose.Types.ObjectId.isValid(chatId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    return res.status(400).json({
      message: "Invalid chatId or senderId",
      data: null,
      ok: false,
    })
  }

  const newMessage = new MessageModel({ chatId, senderId, text })

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
  const { chatId } = req.params

  // Check if payload data is complete
  if (!chatId) {
    return res.status(400).json({
      message: "chatId params is required!",
      data: null,
      ok: false,
    })
  }

  // Check if chatId is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({
      message: "Invalid chatId!",
      data: null,
      ok: false,
    })
  }

  try {
    const allMessages = await MessageModel.find({
      chatId: chatId,
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
