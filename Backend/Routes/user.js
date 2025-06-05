import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {get} from "../controller/authController.js";
const router = express.Router();

router.get("/me", authMiddleware, get);

export default router