import express from "express";
const router = express.Router();
import { Login, Register } from "../controller/authController.js";


router.post("/register", Register);
router.post("/login", Login);

export default router;
