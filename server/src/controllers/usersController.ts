import { Request, Response } from "express"
import bcrypt from "bcrypt"
import UserModel from "../models/User"

export const updateUser = async (req: Request, res: Response) => {
  /* 
	Update the information of a user.
	*/

  // Check if the request body userId and the request param userId is matching, or if the user is an admin.
  if (req.body.userId === req.params.userId || req.body.admin) {
    // If the body contains "password" key & check if the password matches the salt
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        return res.status(500).json({ message: error, data: null, ok: false })
      }
    }

    /* 
		Using the userId, search DB and update the information provided in the requests body.
		$set is a query: https://www.mongodb.com/docs/manual/reference/operator/update/set/
		*/
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.userId, {
        $set: req.body,
      })
      res
        .status(200)
        .json({ message: "Account has been updated.", data: user, ok: true })
    } catch (error) {
      return res.status(500).json({ message: error, data: null, ok: false })
    }
  } else {
    return res.status(403).json({
      message:
        "userId params and property are both required! Or user does not have appropriate priveleges!",
      data: null,
      ok: false,
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  /*
	Delete a users account.
	*/
  console.log(req.body.userId)
  console.log(req.params.userId)

  // Check if the request body userId and the request param userId is matching, or if the user is an admin.
  if (req.body.userId === req.params.userId || req.body.admin) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.body.userId)
      return res.status(200).json({
        message: "Account has been deleted.",
        data: deletedUser,
        ok: true,
      })
    } catch (error) {
      return res.status(500).json({ message: error, data: null, ok: false })
    }
  } else {
    return res.status(403).json({
      message:
        "userId params and property are both required! Or user does not have appropriate priveleges!",
      data: null,
      ok: false,
    })
  }
}

export const getUser = async (req: Request, res: Response) => {
  /* 
	Retreive the informaton of a user.
	*/
  try {
    const user = await UserModel.findById(req.params.userId)
    const { password, updatedAt, ...others } = user!.toJSON() // Destructuring user object to exclude sensitive information such as password
    return res
      .status(200)
      .json({ message: "User successfully fethed!", data: others, ok: true })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
