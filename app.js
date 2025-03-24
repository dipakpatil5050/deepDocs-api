import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
import { PORT } from "./src/config/env.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DeepDocs API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, async () => {
  console.log(`DeepDocs App API is running on port ${PORT}`);

  // await connectToDatabase();
});
