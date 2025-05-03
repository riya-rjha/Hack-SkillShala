import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING

const connectDB = async() => {
    try{
        await mongoose.connect(CONNECTION_STRING)
        console.log("Connected to DB")
    }catch(err){
        console.log("Error in connecting to databse:", err.message)
    }
}



export default connectDB;