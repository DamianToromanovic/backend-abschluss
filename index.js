import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import db from "./db/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import applicantRoutes from "./routes/applicant.route.js";
import companyRoutes from "./routes/company.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
await db.connect();

app.get("/", (_, res) => res.send("Hello from backend"));

app.use("/api/auth", authRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/applicant", applicantRoutes);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
