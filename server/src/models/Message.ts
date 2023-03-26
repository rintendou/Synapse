import mongoose from "mongoose"
mongoose.set("strictQuery", false)

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// Setting up Schema of Chatroom
const MessageSchema = new Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
)

const MessageModel = mongoose.model("Message", MessageSchema)

export default MessageModel
