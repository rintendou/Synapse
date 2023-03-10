import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

export const updateUser = async (req: Request, res: Response) => {
	if (req.body.userId === req.params.userId || req.body.admin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error);
			}
		}

		try {
			const user = await UserModel.findByIdAndUpdate(req.params.userId, { $set: req.body });
			res.status(200).json("Account has been updated.");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("Cannot update other users.");
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	console.log(req.body.userId);
	console.log(req.params.userId);
	if (req.body.userId === req.params.userId || req.body.admin) {
		try {
			await UserModel.findByIdAndDelete(req.body.userId);
			return res.status(200).json("Account has been deleted.");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("Cannot delete other users.");
	}
}

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(req.params.userId);
		const { password, updatedAt, ...others } = user!.toJSON(); // Destructuring user object
		return res.status(200).json(others);
	} catch (error) {
		return res.status(500).json(error);
	}
}