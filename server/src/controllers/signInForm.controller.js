import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { SignIn } from "../models/signIn.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const signInForm = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  const { email, password, remember } = body;
  console.log("in controller");

  const user = await SignIn.findOne({ email });
  console.log(email, password, remember);
  console.log("User",user);
  if (!user) {
    throw new ApiError(404, "User not found!");
  }
 
  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log("IsPasswordCorrect", isPasswordCorrect);
  if(!isPasswordCorrect)
  {
    console.log("Incorrect password");
    throw new ApiError(500, "Incorrect Email Id or password!");
  }

  //if passowrd correct then provide the jwt token
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 36000,
  });

  res.success(200, { token: token }, "User Logged in succesfully");
});

export { signInForm };
