import app from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { ApiError } from "./util/ApiError.js";
dotenv.config();
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    server.on("error", (error) => {
      console.log("Server failed to start =>", error.message);
      process.exit(1);
    });
  } catch (serverError) {
    console.error("❌ Failed to start server:", serverError.message);
    throw new ApiError(500, "Server startup failed!");
  }
};

startServer();

// const startServer = () => {
//   connectDB()
//   .then((err,req,res,next)=>{
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//   })
//   app.on((err)=>console.log(err));
//   })
//   .catch((err)=> {throw new ApiError(err)});

// };

// startServer();
