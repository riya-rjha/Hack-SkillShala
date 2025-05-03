import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    topics: {
        type: [String],
        default: []
    },
    testsTaken: [
        {
            type: Schema.Types.ObjectId,
            ref: "Test"
        }
    ]
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);