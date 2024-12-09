import express from "express";
import { verifyJWT, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
  getAllQuestionsRandomOrder,
  getFirst30Questions,
  getRandom85Questions,
  updateQuestion,
} from "../controllers/subjectController.js";

const router = express.Router();

router.route("/random").get(verifyJWT, getAllQuestionsRandomOrder);

router.route("/limited/:subject").get(verifyJWT, getFirst30Questions);

router.route("/random85/:subject").get(verifyJWT, getRandom85Questions);

router
  .route("/:subject/:id")
  .put(verifyJWT, authorizeAdmin, updateQuestion)
  .delete(verifyJWT, authorizeAdmin, deleteQuestion);

router
  .route("/:subject")
  .get(verifyJWT, getAllQuestions)
  .post(verifyJWT, authorizeAdmin, addQuestion);

export default router;
