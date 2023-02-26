import express from "express";

// user controller
import {updateUser, deleteUser, getUser} from '../controllers/usersController'

const UserRoute = express.Router();

// Update user
UserRoute.put("/:userId", updateUser);

// Delete user
UserRoute.delete("/:userId", deleteUser);

// Get User
UserRoute.get("/:userId", getUser);

// Add a user WIP
UserRoute.put("/:userId/add",async (req: Request, res: Response) => {
	if (req.body.userId  !== req.params.userId) {
		try {
			
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("Cannot add yourself");
	}
})

export default UserRoute;
