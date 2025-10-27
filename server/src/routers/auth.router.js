import express from "express";
import { register } from "../controllers/register.controller.js";
const router = express.Router();

console.log("register =", register);

router.post("/register", register);

export default router;
