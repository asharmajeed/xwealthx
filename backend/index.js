import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import gPQuestionRoutes from "./routes/gPQuestionRoutes.js";
import rMQuestionRoutes from "./routes/rMQuestionRoutes.js";
import iPQuestionRoutes from "./routes/iPQuestionRoutes.js";
import tPQuestionRoutes from "./routes/tPQuestionRoutes.js";
import rSQuestionRoutes from "./routes/rSQuestionRoutes.js";
import ePQuestionRoutes from "./routes/ePQuestionRoutes.js";
import gPgfQuestionRoutes from "./routes/gPgfQuestionRoutes.js";
import rMgfQuestionRoutes from "./routes/rMgfQuestionRoutes.js";
import iPgfQuestionRoutes from "./routes/iPgfQuestionRoutes.js";
import tPgfQuestionRoutes from "./routes/tPgfQuestionRoutes.js";
import rSgfQuestionRoutes from "./routes/rSgfQuestionRoutes.js";
import ePgfQuestionRoutes from "./routes/ePgfQuestionRoutes.js";
import questionRoutes from "./routes/subjectRoutes.js"

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

app.use('/api/questions', questionRoutes);
// subject wise question routes
app.use("/api/quiz-data/gp-questions", gPQuestionRoutes);
app.use("/api/quiz-data/rm-questions", rMQuestionRoutes);
app.use("/api/quiz-data/ip-questions", iPQuestionRoutes);
app.use("/api/quiz-data/tp-questions", tPQuestionRoutes);
app.use("/api/quiz-data/rs-questions", rSQuestionRoutes);
app.use("/api/quiz-data/ep-questions", ePQuestionRoutes);
// subject wise question routes of google form
app.use("/api/quiz-data/gp-gf-questions", gPgfQuestionRoutes);
app.use("/api/quiz-data/rm-gf-questions", rMgfQuestionRoutes);
app.use("/api/quiz-data/ip-gf-questions", iPgfQuestionRoutes);
app.use("/api/quiz-data/tp-gf-questions", tPgfQuestionRoutes);
app.use("/api/quiz-data/rs-gf-questions", rSgfQuestionRoutes);
app.use("/api/quiz-data/ep-gf-questions", ePgfQuestionRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
