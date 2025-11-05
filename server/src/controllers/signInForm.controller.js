import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { Signup } from "../models/signup.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

console.log("JWT_REFRESH used for sign:", process.env.JWT_REFRESH?.slice(0, 10));


const signInForm = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  const { email, password, remember } = body;
  console.log("in controller");

  const user = await Signup.findOne({ email });
  console.log(email, password, remember);
  console.log("User", user);
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log("IsPasswordCorrect", isPasswordCorrect);
  if (!isPasswordCorrect) {
    console.log("Incorrect password");
    throw new ApiError(500, "Incorrect Email Id or password!");
  }

  //if passowrd correct then provide the jwt token
  const payload = {
    id: user._id,
    email: user.email,
  };

  //create a access token
  const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  //create a refresh token
  const refreshToken = jsonwebtoken.sign(
    { id: user._id },
    process.env.JWT_REFRESH,
    { expiresIn: "7d" }
  );

  //attach the access token with cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 1000,
  });

  //attach the refresh token with cookie

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path:"/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  console.log("Token = >", accessToken);
  res.success(
    200,
    { user: user.fname, profile_photo: user.profile_photo },
    "User Logged in succesfully"
  );
});

export { signInForm };
