import express from "express";
import cors from 'cors';
import authRouter from './routers/auth.router.js';
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { responseMiddleware } from "./middlewares/ResponseHandler.middleware.js";
import { ApiError } from "./util/ApiError.js";
const app =  express();

app.use(cors());
app.use(responseMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//route
app.use("/api/v1", authRouter);

//404 route
app.use((req, res, next)=> next(new ApiError(404, "Route not found")));

app.use(errorHandler)


export default app;

