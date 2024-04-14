

import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
    {

        username: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)


export default mongoose.models.User || mongoose.model("User", userSchema)