import mongoose, {Schema} from "mongoose";


const testSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    solvedQues:[
        {
            Question: {
                type: Schema.Types.ObjectId,
                ref: "Ques"
            },
            status: {
                type: Boolean,
                default: false
            },
            userCode: {
                type: String,
            }
        }
    ],
    totalQuestions: {
        type: Number,
        default: 2
    },
    attempted: {
        type: Number,
        default: 0
    },
    correctQues: {
        type: Number,
        default: 0
    },
    wrongQues: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true});

export const Test = mongoose.model("Test", testSchema);