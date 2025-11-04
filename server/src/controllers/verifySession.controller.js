import { asyncHandler } from "../util/asyncHandler.js";
import { Signup } from "../models/signup.model.js";
import { ApiError } from "../util/ApiError.js";

const verifySession = asyncHandler(async (req, res, next) => {
  //retrive the user info from the database
  const user = await Signup.findById(req.user.id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found !");
  }
  res.success(200, user, "Session Verified Succesfully!");
});

export { verifySession };
