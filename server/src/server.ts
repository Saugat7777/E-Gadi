import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth";
import authRouter from "./routes/auth";
import newCarRouter from "./routes/newCar";
import uploadImageRouter from "./routes/upload";
import usedCarRouter from "./routes/usedCar";
import userRouter from "./routes/user";
import userDataRouter from "./routes/userData";

const app: Express = express();
const uri: string = process.env.MONGODB_URI as string;
const PORT: string | number = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:4444",
    allowedHeaders: ["Content-Type", "x-auth-token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/auth", userRouter);
app.use("/api/upload", uploadImageRouter);
app.use(authMiddleware);
app.use("/api/user/", userDataRouter);
app.use("/api/car", newCarRouter);
app.use("/api/car", usedCarRouter);

console.log("Loading...");
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.log("Error connecting DB");
    throw error;
  });

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});
