import express from "express";
import { isCompany } from "../middleware/role.middleware";

const router = express.Router();

router.get("/", isCompany, addJob);

export default router;
