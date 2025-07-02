import express from "express";
import { isCompany } from "../middleware/role.middleware.js";
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "../controller/company.controller.js";

const router = express.Router();

router.get("/", isCompany, getJobs);
router.post("/", isCompany, addJob);
router.patch("/:id", isCompany, updateJob);
router.delete("/:id", isCompany, deleteJob);

export default router;
