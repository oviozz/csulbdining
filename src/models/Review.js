

import mongoose, {Schema} from "mongoose";

const reviewScheme = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        dorm: {
            type: String,
            required: true
        },
        menuItem: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Review || mongoose.model("Review", reviewScheme)