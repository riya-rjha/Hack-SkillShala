import mongoose, { Schema } from "mongoose";


const roadmapSchema = new Schema({
    week: {
        type: Number,
        required: true
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Ques"
        }
    ]
}, { timestamps: true });

export const Roadmap = mongoose.model("Roadmap", roadmapSchema);