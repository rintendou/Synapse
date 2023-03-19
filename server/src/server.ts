require("dotenv").config({ path: '../.env'})

import express, { Request, Response } from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

mongoose.set("strictQuery", false)

// Declaring all routes, exported as a module and imported here
import UserRoute from "./routes/users"
import AuthRoute from "./routes/auth"

import ChatRoute from "./routes/chat"
// import HomeRoute from "./routes/home";
import MessageRoute from "./routes/messages"

const app = express()

// Middleware
app.use(express.json()) // This allows for requests to be accessed, turns req -> JSON object (body can be accessed &)
app.use(helmet())
app.use(morgan("common"))
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

app.use((req: Request, res: Response, next: Function) => {
  console.log(req.path, req.method)
  next()
})

app.use("/api/users", UserRoute)
app.use("/api/auth", AuthRoute)

// app.use("/api/home", HomeRoute);
app.use("/api/chat", ChatRoute)
app.use("/api/messages", MessageRoute)



mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("Connected to MongoDB")
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)
  })
})
