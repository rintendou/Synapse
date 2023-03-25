import { Request, Response } from "express"
import UserModel from "../models/User"

export const addFriend = async (req: Request, res: Response) => {
  // Destucture the payload attached to the body and params
  const { friendUsername } = req.body
  const { username } = req.params

  // Check if both usernames match
  if (friendUsername === username) {
    return res.status(400).json({
      message: "Invalid Request!",
      data: null,
      ok: false,
    })
  }

  // Check if payload data is complete
  if (!friendUsername || !username) {
    return res.status(400).json({
      message: "friendUsername property and username params are required!",
      data: null,
      ok: false,
    })
  }

  try {
    const friend = await UserModel.findOne({ username: friendUsername })
    const user = await UserModel.findOne({ username: username })

    // Check if friend or user objects exist in the db
    if (!friend || !user) {
      return res
        .status(404)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    const relationships = user.relationships

    // Check if user already has a friend-relationship with the friend
    // if a friend's username has a match in the relationships arr, return true. Otherwise, return false.
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
      .json({ message: "Friend successfully added!", data: friend, ok: true })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const removeFriend = async (req: Request, res: Response) => {
  // Destucture the payload attached to the body and params
  const { friendUsername } = req.body
  const { username } = req.params

  // Check if both usernames match
  if (friendUsername === username) {
    return res.status(400).json({
      message: "Invalid Request!",
      data: null,
      ok: false,
    })
  }

  // Check if payload data is complete
  if (!friendUsername || !username) {
    return res.status(400).json({
      message: "friendUsername property and username params are required!",
      data: null,
      ok: false,
    })
  }

  try {
    const friendToBeRemoved = await UserModel.findOne({
      username: friendUsername,
    })
    const user = await UserModel.findOne({ username: username })

    // Check if friend or user objects exist in the db
    if (!friendToBeRemoved || !user) {
      return res
        .status(404)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    const relationships = user.relationships

    // Check if user already does not have a relationship with the friend.
    // if a friend's username has a match in the relationships arr, return true. Otherwise, return false.
    const areFriends = relationships.some(
      (f) => f.username === friendToBeRemoved.username
    )
    if (!areFriends) {
      return res.status(404).json({
        message: "Users are not already friends!",
        data: friendToBeRemoved,
        ok: false,
      })
    }

    // Remove friend from user's relationships by filtering the friend's username
    const filteredRelationships = relationships.filter(
      (f) => f.username !== friendToBeRemoved.username
    )
    user.relationships = filteredRelationships
    await user.save()

    res.status(200).json({
      message: "Friend successfully removed",
      data: friendToBeRemoved,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const blockUser = async (req: Request, res: Response) => {
  // Destucture the payload attached to the body and params
  const { usernameToBeBlocked } = req.body
  const { username } = req.params

  // Check if both usernames match
  if (usernameToBeBlocked === username) {
    return res.status(400).json({
      message: "Invalid Request!",
      data: null,
      ok: false,
    })
  }

  // Check if payload data is complete
  if (!usernameToBeBlocked || !username) {
    return res.status(400).json({
      message: "usernameToBeBlocked property and username params are required!",
      data: null,
      ok: false,
    })
  }

  try {
    const userToBeBlocked = await UserModel.findOne({
      username: usernameToBeBlocked,
    })
    const user = await UserModel.findOne({ username: username })

    // Check if friend or user objects exist in the db
    if (!userToBeBlocked || !user) {
      return res
        .status(404)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    const blocked = user.blocked

    // Check if user already has blocked the userToBeBlocked.
    // if a userToBeBlocked's username has a match in the blocked arr, return true. Otherwise, return false.
    const userAlreadyBlocked = blocked.some(
      (u) => u.username === userToBeBlocked.username
    )
    if (userAlreadyBlocked) {
      return res.status(404).json({
        message: "User is already blocked!",
        data: userToBeBlocked,
        ok: false,
      })
    }

    // Add userToBeBlocked in the blocked property of the user
    blocked.push(userToBeBlocked)
    user.blocked = blocked
    await user.save()

    res.status(200).json({
      message: "User successfully blocked!",
      data: userToBeBlocked,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const unblockUser = async (req: Request, res: Response) => {
  // Destucture the payload attached to the body and params
  const { usernameToBeUnblocked } = req.body
  const { username } = req.params

  // Check if both usernames match
  if (usernameToBeUnblocked === username) {
    return res.status(400).json({
      message: "Invalid Request!",
      data: null,
      ok: false,
    })
  }

  // Check if payload data is complete
  if (!usernameToBeUnblocked || !username) {
    return res.status(400).json({
      message:
        "usernameToBeUnblocked property and username params are required!",
      data: null,
      ok: false,
    })
  }

  try {
    const userToBeUnblocked = await UserModel.findOne({
      username: usernameToBeUnblocked,
    })
    const user = await UserModel.findOne({ username: username })

    // Check if friend or user objects exist in the db
    if (!userToBeUnblocked || !user) {
      return res
        .status(404)
        .json({ message: "User does not exist!", data: null, ok: false })
    }

    const blocked = user.blocked

    // Check if user has blocked the userToBeUnblocked.
    // if a userToBeUnblocked's username has a match in the blocked arr, return true. Otherwise, return false.
    const userAlreadyBlocked = blocked.some(
      (u) => u.username === userToBeUnblocked.username
    )
    if (!userAlreadyBlocked) {
      return res.status(404).json({
        message: "User is already unblocked!",
        data: userToBeUnblocked,
        ok: false,
      })
    }

    // Remove userToBeUnblocked in the blocked property of the user
    const filteredBlocked = blocked.filter(
      (u) => u.username !== userToBeUnblocked.username
    )
    user.blocked = filteredBlocked
    await user.save()

    res.status(200).json({
      message: "User successfully unblocked!",
      data: userToBeUnblocked,
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
