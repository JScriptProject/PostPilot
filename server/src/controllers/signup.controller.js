import { asyncHandler } from "../util/asyncHandler.js";

const signup = asyncHandler((req, res, next) => { 
    const body = req.body || {};
    const {fname, email, password, confirm_password, organization} = body;
    const fileData = req.file || {};
    console.log("File =>", fileData);
    console.log("Other data =>", fname, email, password, confirm_password, organization);
    res.success(200,{user:"Ravi"}, "User Registered Succesfully!");
 })

 export {signup};