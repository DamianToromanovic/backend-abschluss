import express from "express";
import { getJobs } from "../controller/company.controller";
import { getAllFiltered } from "../controller/applicant.controller";

const router = express.Router();

router.get("/", getJobs);
router.get("/filter", getAllFiltered);
export default router;
