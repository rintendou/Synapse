import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

export const updateUser = async (req: Request, res: Response) => {
	/* 
	Update the information of a user.
	*/

	// Check if the request body userId and the request param userId is matching, or if the user is an admin.
	if (req.body.userId === req.params.userId || req.body.admin) {
		// If the body contains "password" key & check if the password matches the salt
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error);
			}
		}

		/* 
		Using the userId, search DB and update the information provided in the requests body.
		$set is a query: https://www.mongodb.com/docs/manual/reference/operator/update/set/
		*/
		try {
			const user = await UserModel.findByIdAndUpdate(req.params.userId, { $set: req.body });
			res.status(200).json("Account has been updated.");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("Cannot update other users.");
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	/*
	Delete a users account.
	*/
	console.log(req.body.userId);
	console.log(req.params.userId);

	// Check if the request body userId and the request param userId is matching, or if the user is an admin.
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
};

export const getUser = async (req: Request, res: Response) => {
	/* 
	Retreive the informaton of a user.
	*/
	try {
		const user = await UserModel.findById(req.params.userId);
		const { password, updatedAt, ...others } = user!.toJSON(); // Destructuring user object
		return res.status(200).json(others);
	} catch (error) {
		return res.status(500).json(error);
	}
};
