import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Setting up Schema of User
const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		pfp: {
			type: String,
			default: "",
		},
		relationships: {
			type: Array,
			default: []
		},
		blocked: {
			type: Array,
			default: []
		},
        admin: {
            type: Boolean,
            default: false
        },
		bio: {
			type: String,
			max: 100
		}
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
