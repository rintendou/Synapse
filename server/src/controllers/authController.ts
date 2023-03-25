import { Request, Response } from "express"
import UserModel from "../models/User"
import bcrypt from "bcrypt"

export const registerUser = async (req: Request, res: Response) => {
  // destructure the payload attached to the body
  const { username, email, password } = req.body

  // Check if appropriate payload is attached to the body
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "username, email, and password properties are required!",
      data: null,
      ok: false,
    })
  }

  try {
    // Hashing password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    // Clean the username by removing whitespaces
    const cleanedUsername = username.replace(/\s+/g, "") // '  hello world ' -> 'helloworld'

    // Check if the username or the email already exists in the db
    const existingUser = await UserModel.findOne({
      $or: [{ username: cleanedUsername }, { email: email }],
    })
    if (existingUser) {
      const message =
        existingUser.username === cleanedUsername
          ? "Username already exists!"
          : "Email already exists!"
      return res.status(400).json({ message, data: null, ok: false })
    }

    // Creating new User
    const user = new UserModel({
      username: cleanedUsername,
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
      return res
        .status(400)
        .json({ message: "User not found", data: null, ok: false })

    const validPassword = await bcrypt.compare(
      req.body.password,
      user!.password
    )

    if (!validPassword)
      return res
        .status(400)
        .json({ message: "Wrong password", data: null, ok: false })

    return res
      .status(200)
      .json({ message: "Login Success!", data: user, ok: true })
  } catch (error) {
    return res.status(500).json({ message: error, data: null, ok: false })
  }
}
