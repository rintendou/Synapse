import { Request, Response } from "express"
import UserModel from "../models/User"
import bcrypt from "bcrypt"

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Hashing password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Clean the username by removing whitespaces
    let { username } = req.body
    username = username.replace(/\s+/g, "") // ' hello world ' -> 'helloworld'

    // Creating new User
    const user = await new UserModel({
      username: username,
      email: req.body.email,
      password: hashedPassword,
    })

    // Saving new User
    const registeredUser = await user.save()
    res.status(200).json({
      message: "User successfully registered!",
      data: registeredUser,
      ok: true,
    })
  } catch (error) {
    res.status(500).json({ message: error, data: null, ok: false })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  /* 
	Search DB via the User Schema w/ unique email. 
	Compare the password in the req to encrypted password in the DB.
	*/

  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    })

    if (!user)
      res.status(400).json({ message: "User not found", data: null, ok: false })

    const validPassword = await bcrypt.compare(
      req.body.password,
      user!.password
    )

    if (!validPassword)
      res.status(400).json({ message: "Wrong password", data: null, ok: false })

    return res
      .status(200)
      .json({ message: "Login Success!", data: user, ok: true })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
