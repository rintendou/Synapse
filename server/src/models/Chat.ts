import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// 
const ChatSchema = new Schema(
	{
		members: {
			type: Array,
		},
	},
	{ timestamps: true }
);

const ChatModel = mongoose.model("Chatroom", ChatSchema);

export default ChatModel;