import express from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
