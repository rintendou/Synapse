import express from "express"

// friend controller
import {
  addFriend,
  removeFriend,
  blockUser,
} from "../controllers/friendReqController"

const FriendRoute = express.Router()

FriendRoute.post("/add-friend/:username", addFriend)

FriendRoute.post("/remove-friend/:username", removeFriend)

FriendRoute.post("/block-user/:username", blockUser)

export default FriendRoute
