import { asyncHandler } from "../util/asyncHandler.js";
import { cloudinaryUpload } from "../util/cloudinary.js";
import { ApiError } from "../util/ApiError.js";
import { Signup } from "../models/signup.model.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from 'fs';

const signup = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  let { fname, email, password, organization } = body;
  if (!organization) {
    organization = "No Org";
  }
  const fileData = req.file || {};
  console.log("File =>", fileData);
  console.log("Other data =>", fname, email, password, organization);
  if (!fileData) {
    throw new ApiError(500, "Opps could't find the Profile photo");
  }

  const filePath = `${path.resolve("public/temp")}/${fileData.filename}`;
  const cloudinary_result = await cloudinaryUpload(filePath);
  const profile_photo = cloudinary_result.secure_url;
  console.log("Profile photo",profile_photo);
  if(fs.existsSync(filePath))
  {
    fs.unlinkSync(filePath);
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
   
  const newSignup = new Signup({
    fname,
    email,
    password:hashedPassword,
    organization,
    profile_photo,
  });

  console.log("New Signup data =", newSignup);

  const savedUser = await newSignup.save();
  if(!savedUser){
    throw new ApiError(500,"Database saved error");
  }
  res.success(201, { user: savedUser.fname }, "User Registered Succesfully!");
});

export { signup };
