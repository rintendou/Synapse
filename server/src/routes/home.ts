import express from "express";

const HomeRoute = express.Router();

HomeRoute.get("/", () => {});

export default HomeRoute;