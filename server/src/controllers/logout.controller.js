import { asyncHandler } from "../util/asyncHandler.js";


const logout = asyncHandler(async(req, res, next)=>{

        res.clearCookie("access_token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        res.clearCookie("refresh_token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            path:"/"
        });
        return res.success(200, null, "User logged out Succesfully")
})

export {logout};