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

export default UserRoute;
