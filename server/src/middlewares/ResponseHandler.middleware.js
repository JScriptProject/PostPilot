import { ApiResponse } from "../util/ApiResponse.js";

const responseMiddleware = (req, res, next) => {
  (res.success = (statusCode , data, message="Success") => {
    const apiResponse = new ApiResponse(statusCode, data, message);
    return res.status(apiResponse.statusCode).json(apiResponse);
  })
  next();
};

export { responseMiddleware };
