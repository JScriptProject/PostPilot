import dotenv from "dotenv";
dotenv.config();
import { Signup } from "../models/signup.model.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import jwt from "jsonwebtoken";

console.log("JWT_REFRESH used for verify:", process.env.JWT_REFRESH?.slice(0, 10));

const refreshSession = asyncHandler(async(req, res, next)=>{
    try {
        const refreshToken = req.cookies?.refresh_token;
        if(!refreshToken)
        {
            return next(new ApiError(401, "Unauthorized:No token provided"));
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        
        const user = await Signup.findById(decoded.id).select("-password");
        if(!user)
        {
            return next(new ApiError(404, "User not found"));
        }

        const newAccessToken = jwt.sign({id:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:"1m"});

        res.cookie("access_token", newAccessToken, {
            httpOnly: true, 
            secure: false, 
            sameSite: "lax", 
            path:'/',
            maxAge: 15 * 60 * 1000
        });
      
        return res.success(200, {user:user.fname}, "Session Refreshed");

    } catch (error) {
        console.error("Refresh token error:",error);
        return next(new ApiError(401, "Unauthorized:Invalid token"));
    }
});

export {refreshSession};