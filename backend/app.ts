import express, { Request, Response } from "express";
import { connectDB } from "./database/db";
import userRoutes from "./routes/userRoutes";
require("dotenv").config();

const app = express();
const PORT: number = Number(process.env.PORT);
connectDB();
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", userRoutes);
app.get("/test", (req: Request, res: Response) => {
  res.send("hi");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
