import express from "express";

import { getAllFiltered, getJobs } from "../controller/applicant.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("",verifyToken, getJobs);
router.get("/filter",verifyToken, getAllFiltered);
export default router;
