import mongoose, {Schema} from "mongoose";


const quesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    testcases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ],
    
}, {timestamps: true});

export const Ques = mongoose.model("Ques", quesSchema);