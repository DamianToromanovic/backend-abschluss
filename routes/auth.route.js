import express from "express";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/verify", userVerify);

export default router;
