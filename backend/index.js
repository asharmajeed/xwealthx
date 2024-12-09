import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/subjectRoutes.js";

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://xwealthx-8dga.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/questions", questionRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
