import { DB_NAME } from "../constant.js";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { ApiError } from "../util/ApiError.js";
dotenv.config();

const connectDB = async()=>{
    const URI = `${process.env.MONGO_DB_URI.replace("<db_user>",process.env.MONGO_DB_USER).replace("<db_password>",process.env.MONGO_DB_PASSWORD)}/${DB_NAME}`;
    
    try {
         await mongoose.connect(URI);
        console.log("Database connection Succesfull !!");
    } catch (error) {

        throw new ApiError(500, "Issue in connection of DB");
    }
}

export {connectDB};

