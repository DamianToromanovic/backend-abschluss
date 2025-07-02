// Viel Spaß!
import express from "express";
import cors from "cors";
import companyRoutes from "./routes/company.route.js";

import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env(PORT);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (_, res) => {
  res.send("Hello from backend");
});

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http:://localhost/${5000}`);
});
