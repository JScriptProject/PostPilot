import express from "express";
import { signup } from "../controllers/signup.controller.js";
const router = express.Router();

console.log("signup:", signup);


router.post("/register", signup);

export default router;
