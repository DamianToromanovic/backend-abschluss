import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify", verifyUser);

export default router;
