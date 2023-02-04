import express, { Request, Response } from "express";
import ChatModel from '../models/Chat'

const ChatRoute = express.Router();

// POST new chat
ChatRoute.post('/', async (req: Request, res: Response) => {
	const newChat = new ChatModel({
		members: [req.body.senderId, req.body.receiverId]
	})

	try {
		const savedChat = await newChat.save();
		return res.status(200).json(savedChat);
	} catch (error) {
		return res.status(500).json(error);
	}
})

// GET chat of a user
ChatRoute.get('/:userId',async (req: Request, res: Response) => {
	try {
		const chat = await ChatModel.find({
			members: { $in: [req.params.userId] },
		});
		return res.status(200).json(chat);
	} catch (error) {
		return res.status(500).json(error)
	}
})

export default ChatRoute;