import express from "express";
import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getFirst20Questions,
  getRandom85Questions,
  getAllQuestionsRandomOrder,
} from "../controllers/iPgfQuestionController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyJWT, addQuestion); // Add a question
router.put("/update/:id", verifyJWT, updateQuestion); // Update a question by ID
router.delete("/delete/:id", verifyJWT, deleteQuestion); // Delete a question by ID
router.get("/all", verifyJWT, getAllQuestions); // Get all questions
router.get("/first20", verifyJWT, getFirst20Questions); // Get first 20 questions
router.get("/random85", verifyJWT, getRandom85Questions); // Get 85 random questions
router.get("/random", verifyJWT, getAllQuestionsRandomOrder); // Get random questions

export default router;
