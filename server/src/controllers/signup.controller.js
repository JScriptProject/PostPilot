import { asyncHandler } from "../util/asyncHandler.js";
import { cloudinaryUpload } from "../util/cloudinary.js";
import { ApiError } from "../util/ApiError.js";
import { Signup } from "../models/signup.model.js";
import path from "path";
import fs from 'fs';

const signup = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  const { fname, email, password, organization } = body;
  if (!organization) {
    organization = "No Org";
  }
  const fileData = req.file || {};
  console.log("File =>", fileData);

  if (!fileData) {
    throw new ApiError(500, "Opps could't find the Profile photo");
  }

  const filePath = `${path.resolve("public/temp")}/${fileData.filename}`;
  const cloudinary_result = await cloudinaryUpload(filePath);
  const profile_photo = cloudinary_result.secure_url;
  if(profile_photo)
  {
    fs.unlinkSync(filePath);
  }
  const newSignup = new Signup({
    fname,
    email,
    password,
    organization,
    profile_photo,
  });

  const savedUser = await newSignup.save();
  if(!savedUser){
    throw new ApiError(500,"Database saved error");
  }
  res.success(201, { user: savedUser.fname }, "User Registered Succesfully!");
});

export { signup };
