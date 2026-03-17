import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_STRING = "mongodb+srv://botchat137_db_user:3dMJWsZv3JQUa73o@skill-shala.tutbqzz.mongodb.net/?retryWrites=true&w=majority&appName=skill-shala";

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error in connecting to database:", err.message);
    }
};

export default connectDB;