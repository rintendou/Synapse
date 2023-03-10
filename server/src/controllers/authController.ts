import { Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
	try {
		// Hashing password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Creating new User
		const user = await new UserModel({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// Saving new User
		const registeredUser = await user.save();
		res.status(200).json(registeredUser);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findOne({
			email: req.body.email,
		});

		if (!user) res.status(400).json("User not found");

		const validPassword = await bcrypt.compare(req.body.password, user!.password);

		if (!validPassword) res.status(400).json("Wrong password");

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
	}
}