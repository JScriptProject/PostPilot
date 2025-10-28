import { asyncHandler } from "../util/asyncHandler.js";


const register = (req, res, next)=>{
    
    res.status(200).json({message : "Success Message"});
    // const body = req.body || {};
    // const {fname, email, password, confirm_password, organization} = body;
    // const fileData = req.file || {};
    // console.log("File=>",fileData);
    // console.log("Other Data =>", fname, email, password, confirm_password, organization);
    // res.success(200, { user: "Ravi" }, "User registered successfully");
}

export { register };