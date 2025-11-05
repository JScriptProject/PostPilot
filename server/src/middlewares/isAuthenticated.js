import dotenv from "dotenv";
dotenv.config();
import { ApiError } from "../util/ApiError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) =>{
    try {
        const token = req.cookies?.access_token;
        if(!token)
        {
            return next(new ApiError(401, "Unauthorized:No token provided"));
        }

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded =>", decoded);
        req.user = decoded;
        console.log("req.user =>", req.user);
        next();
    } catch (error) {
        console.error("JWT Verification failed", error);
        return next(ApiError(401, "Unauthorized:Invalid token"));
    }
};