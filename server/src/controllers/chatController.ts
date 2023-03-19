import { Request, Response } from "express"
import ChatModel from "../models/Chat"

export const createChat = async (req: Request, res: Response) => {
  /* 
	Create a new chat using the ChatModel.
	Inside the request body, there are two keys: "senderId" & "receiverId". The ID's should be the ObjectId of the users in the DB.
	*/
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  })

  try {
    const savedChat = await newChat.save()
    return res.status(200).json({
      message: "Chat successfully created!",
      data: savedChat,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const getUserChat = async (req: Request, res: Response) => {
  /* 
	Retreive a chat using the ChatModel.
	Inside the params (the URL), the user's unqiue ObjectId will be the parameter.
	$in is a query: https://www.mongodb.com/docs/manual/reference/operator/query/in/
	*/

  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    })
    return res.status(200).json({
      message: "User chat successfully fetched!",
      data: chat,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
