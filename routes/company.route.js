import express from "express";
import { isCompany } from "../middleware/role.middleware";

const router = express.Router();

router.post("/", isCompany, addJob);
router.patch("/:id", isCompany, updateJob);
router.delete("/:id", isCompany, deleteJob);

export default router;
