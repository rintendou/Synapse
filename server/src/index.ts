require("dotenv").config();

import express, { Request, Response } from "express";

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("hello world");
});

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
});
