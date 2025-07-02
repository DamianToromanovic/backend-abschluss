import express from "express";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify", verifyUser);

export default router;
