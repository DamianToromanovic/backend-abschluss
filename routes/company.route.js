import express from "express";
import { isCompany } from "../middleware/role.middleware.js";
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "../controller/company.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("", verifyToken, isCompany, getJobs);
router.post("", verifyToken, isCompany, addJob);
router.patch("/:id", verifyToken, isCompany, updateJob);
router.delete("/:id", verifyToken, isCompany, deleteJob);

export default router;
