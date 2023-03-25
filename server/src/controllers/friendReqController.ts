import { Request, Response } from "express"
import UserModel from "../models/User"

export const addFriend = async (req: Request, res: Response) => {
  // Destucture the payload attached to the body and params
  const { friendUsername } = req.body
  const { username } = req.params

  if (!friendUsername || !username) {
    return res.status(400).json({
      message: "friendUsername property and username params are required!",
      data: null,
      ok: false,
    })
  }

  try {
    const friend = await UserModel.findOne({ username: friendUsername })
    const user = await UserModel.findOne({ username: friendUsername })

    // Check if friend or user objects exist
    if (!friend || !user) {
      return res
        .status(404)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    const relationships = user.relationships

    // Check if user already has a friend-relationship with the friend
    const friendAlreadyExists = relationships.some(
      (f) => f.username === friend.username
    )
    if (friendAlreadyExists) {
      return res
        .status(404)
        .json({ message: "Friend is already added!", data: friend, ok: false })
    }

    // Add friend to user's relationships
    relationships.push(friend)
    user.relationships = relationships
    await user.save()
    res
      .status(200)
      .json({ message: "Friend successfully added!", data: friend, ok: false })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const removeFriend = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const blockFriend = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
