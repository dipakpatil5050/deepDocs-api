import express from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./src/config/env.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import authRouter from "./src/routes/auth.routes.js";
import connectToDatabase from "./src/database/mongodb.js";
import userRouter from "./src/routes/user.routes.js";
import cardRouter from "./src/routes/card.routes.js";
import "./src/jobs/trashCleanupJob.js";

const app = express();

app.use(
  cors({
    origin: NODE_ENV === "production" ? "*" : "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cards", cardRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DeepDocs Note App" });
});

app.get("*", (req, res) => {
  res.json({ message: "Route not found" });
});

app.listen(PORT, async () => {
  console.log(`DeepDocs App API is running on port ${PORT}`);
  await connectToDatabase();
});

// live deploye link of API : https://deepdocs-api.onrender.com
