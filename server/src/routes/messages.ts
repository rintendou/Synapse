import express from "express";

// messages controller
import {createMessage, getMessages} from '../controllers/messagesController'

const MessageRoute = express.Router();

// POST new message
MessageRoute.post('/', createMessage);

// GET messages
MessageRoute.get('/:chatId', getMessages);

export default MessageRoute;