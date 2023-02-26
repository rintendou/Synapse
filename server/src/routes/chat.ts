import express from "express";

// chat controller
import {createChat, getUserChat} from '../controllers/chatController'

const ChatRoute = express.Router();

// POST new chat
ChatRoute.post('/', createChat)

// GET chat of a user
ChatRoute.get('/:userId', getUserChat)

export default ChatRoute;