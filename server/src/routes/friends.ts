import express from "express"

// friend controller
import {
  addFriend,
  removeFriend,
  blockUser,
  unblockUser,
} from "../controllers/friendReqController"

const FriendRoute = express.Router()

FriendRoute.post("/add-friend/:username", addFriend)

FriendRoute.post("/remove-friend/:username", removeFriend)

FriendRoute.post("/block-user/:username", blockUser)

FriendRoute.post("/unblock-user/:username", unblockUser)

export default FriendRoute
