import express from "express";
import { upload } from '../middlewares/multer.middleware.js';
import { signup } from "../controllers/signup.controller.js";
import { signInForm } from "../controllers/signInForm.controller.js";

const router = express.Router();

console.log("signup:", signup);

router.post("/login", signInForm);
router.post("/signup", upload.single("profile_photo"),signup);
export default router;
