import express, { Request, Response } from "express";
import MessageModel from '../models/Message'

const MessageRoute = express.Router();

// POST new message
MessageRoute.post('/', async (req: Request, res: Response) => {
    const newMessage = new MessageModel(req.body);

    try {
        const savedMessaged = await newMessage.save();
        return res.status(200).json(savedMessaged);
    } catch (error) {
        return res.status(500).json(error)
    }
});

// GET messages
MessageRoute.get('/:chatId',async (req: Request, res: Response) => {
    try {
        const allMessages = await MessageModel.find({
            chatId: req.params.chatId,
        })
        return res.status(200).json(allMessages);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default MessageRoute;